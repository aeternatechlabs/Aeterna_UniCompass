import type { Request, Response, NextFunction } from "express";

// In-memory token bucket rate limiter
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000).unref();

export const createRateLimiter = (options: {
  windowMs: number;
  max: number;
  message: string;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Determine client identifier (IP or forwarded IP)
    const forwarded = req.headers["x-forwarded-for"];
    const ip =
      (typeof forwarded === "string" ? forwarded.split(",")[0]?.trim() : null) ||
      req.socket.remoteAddress ||
      "unknown-ip";

    const key = `${req.baseUrl || ""}:${req.path}:${ip}`;
    const now = Date.now();
    const existing = rateLimitStore.get(key);

    if (!existing || now > existing.resetTime) {
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + options.windowMs,
      });
      res.setHeader("X-RateLimit-Limit", options.max);
      res.setHeader("X-RateLimit-Remaining", options.max - 1);
      return next();
    }

    if (existing.count >= options.max) {
      const retryAfterSeconds = Math.ceil((existing.resetTime - now) / 1000);
      res.setHeader("Retry-After", retryAfterSeconds);
      res.setHeader("X-RateLimit-Limit", options.max);
      res.setHeader("X-RateLimit-Remaining", 0);
      return res.status(429).json({
        success: false,
        message: options.message,
        retryAfter: retryAfterSeconds,
      });
    }

    existing.count += 1;
    res.setHeader("X-RateLimit-Limit", options.max);
    res.setHeader("X-RateLimit-Remaining", Math.max(0, options.max - existing.count));
    return next();
  };
};

// Security headers middleware
export const securityHeaders = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  if (process.env.NODE_ENV === "production") {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
    );
  }

  next();
};

// Honeypot spam check for forms
export const spamHoneypotCheck = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const honeypot = req.body?.botField || req.body?.website_hp;
  if (honeypot && String(honeypot).trim().length > 0) {
    // Silently return success to bot without saving
    return res.status(200).json({
      success: true,
      message: "Request processed successfully.",
    });
  }
  next();
};
