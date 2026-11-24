// Privacy-respecting analytics dispatcher for Aeterna UniCompass

export interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean; // Optional, requires consent
  consentTimestamp?: string;
}

const STORAGE_KEY = "aeterna_cookie_consent";

export const getStoredConsent = (): CookiePreferences | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePreferences;
  } catch {
    return null;
  }
};

export const setStoredConsent = (prefs: CookiePreferences) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...prefs,
        essential: true,
        consentTimestamp: new Date().toISOString(),
      }),
    );
  } catch (e) {
    console.warn("Unable to save cookie consent to localStorage", e);
  }
};

export const isAnalyticsPermitted = (): boolean => {
  const prefs = getStoredConsent();
  return Boolean(prefs?.analytics);
};

export const trackEvent = (
  eventName: string,
  parameters: Record<string, string | number | boolean> = {},
) => {
  if (!isAnalyticsPermitted()) {
    return;
  }

  // Filter out any accidentally passed sensitive keys
  const sanitizedParams: Record<string, string | number | boolean> = {};
  const forbiddenKeys = ["password", "token", "prompt", "message", "secret"];

  for (const [key, value] of Object.entries(parameters)) {
    if (!forbiddenKeys.some((fk) => key.toLowerCase().includes(fk))) {
      sanitizedParams[key] = value;
    }
  }

  // Dispatch standard CustomEvent for analytics listeners (e.g. GA4, Plausible, PostHog)
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("aeterna_event", {
        detail: { event: eventName, ...sanitizedParams },
      }),
    );

    // If gtag / Google Analytics is installed on window
    const win = window as unknown as { dataLayer?: unknown[] };
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event: eventName,
        ...sanitizedParams,
      });
    }
  }
};
