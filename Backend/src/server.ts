import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToDB from "./config/db.js";
import countryRouter from "./routes/country.routes.js";
import costRouter from "./routes/cost.routes.js";
import pathwayRouter from "./routes/pathway.routes.js";
import aiRouter from "./routes/ai.routes.js";
import currencyRouter from "./routes/currency.routes.js";
import assistanceRoutes from "./routes/assistance.routes.js";
import {
  securityHeaders,
  createRateLimiter,
  spamHoneypotCheck,
} from "./middleware/security.js";

dotenv.config();

const app = express();

// Trust reverse proxy (e.g. Nginx, Cloudflare, AWS ALB) for accurate IP in rate limiting & secure cookies
app.set("trust proxy", 1);

// Security Headers
app.use(securityHeaders);

// CORS configuration supporting local dev and production domains
const configuredOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((s) => s.trim())
  : [];

const defaultOrigins = ["http://localhost:5173", "http://localhost:3000"];
const allowedOrigins = Array.from(new Set([...defaultOrigins, ...configuredOrigins]));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Rate Limiters
const generalApiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: "Too many requests. Please try again later.",
});

const aiLimiter = createRateLimiter({
  windowMs: 5 * 60 * 1000,
  max: 35,
  message: "AI query limit reached. Please wait a few moments before trying again.",
});

const assistanceLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: "Submission limit reached. Please try again after 15 minutes.",
});

app.use("/api", generalApiLimiter);
app.use("/api/assistance", assistanceLimiter, spamHoneypotCheck, assistanceRoutes);

app.get("/", (_req, res) => {
  res.status(200).send("Aeterna UniCompass API is running");
});

app.use("/api/countries", countryRouter);
app.use("/api/costs", costRouter);
app.use("/api/pathways", pathwayRouter);
app.use("/api", aiLimiter, aiRouter);
app.use("/api/currency", currencyRouter);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

const startServer = async () => {
  try {
    await connectToDB();

    const port = Number(process.env.PORT) || 3000;

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

void startServer();
