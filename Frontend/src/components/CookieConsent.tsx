import React, { useState } from "react";
import type { ThemeMode } from "../types";
import { Cookie, X, Check, Settings2, ShieldCheck } from "lucide-react";
import {
  getStoredConsent,
  setStoredConsent,
  type CookiePreferences,
} from "../utils/analytics";

interface CookieConsentProps {
  theme: ThemeMode;
  onNavigatePolicy: () => void;
  isOpenExplicitly?: boolean;
  onCloseExplicitModal?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  theme,
  onNavigatePolicy,
  isOpenExplicitly = false,
  onCloseExplicitModal,
}) => {
  const [hasPrompted, setHasPrompted] = useState<boolean>(() => {
    return Boolean(getStoredConsent());
  });
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState<boolean>(() => {
    return Boolean(getStoredConsent()?.analytics);
  });

  const isLight = theme === "light";

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: true,
    };
    setStoredConsent(prefs);
    setAnalyticsAllowed(true);
    setHasPrompted(true);
    setShowPreferences(false);
    onCloseExplicitModal?.();
  };

  const handleRejectOptional = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: false,
    };
    setStoredConsent(prefs);
    setAnalyticsAllowed(false);
    setHasPrompted(true);
    setShowPreferences(false);
    onCloseExplicitModal?.();
  };

  const handleSaveCustom = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: analyticsAllowed,
    };
    setStoredConsent(prefs);
    setHasPrompted(true);
    setShowPreferences(false);
    onCloseExplicitModal?.();
  };

  const isVisible = !hasPrompted || isOpenExplicitly;

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 font-sans"
    >
      <div
        className={`rounded-2xl border p-5 shadow-2xl backdrop-blur-md ${
          isLight
            ? "bg-white/95 border-[#CAE4DB] text-[#00303F] shadow-[#00303F]/10"
            : "bg-[#002632]/95 border-[#7A9D96]/40 text-[#CAE4DB] shadow-black/50"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#00303F] border border-[#DCAE1D] flex items-center justify-center text-[#DCAE1D] shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h3
                className={`text-sm font-bold leading-tight ${
                  isLight ? "text-[#00303F]" : "text-white"
                }`}
              >
                Cookie &amp; Privacy Preferences
              </h3>
              <span className="text-[10px] text-[#7A9D96]">
                Respecting your academic privacy
              </span>
            </div>
          </div>
          {isOpenExplicitly && (
            <button
              onClick={onCloseExplicitModal}
              className="p-1 rounded-full text-[#7A9D96] hover:text-[#DCAE1D] transition-colors"
              aria-label="Close preferences"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content body */}
        {!showPreferences ? (
          <div>
            <p className="text-xs text-[#7A9D96] leading-relaxed mb-4">
              We use essential cookies to ensure system security and preserve your preferences (such as theme choice). Optional performance analytics help us refine university pathway discovery.
            </p>
            <div className="flex items-center gap-2 mb-4 text-[11px]">
              <button
                onClick={onNavigatePolicy}
                className="text-[#DCAE1D] hover:underline font-medium cursor-pointer"
              >
                Read Privacy Policy
              </button>
              <span className="text-[#7A9D96]">·</span>
              <button
                onClick={() => setShowPreferences(true)}
                className="text-[#7A9D96] hover:text-[#DCAE1D] transition-colors cursor-pointer"
              >
                Customize
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-[#DCAE1D] hover:opacity-90 active:scale-95 text-[#00303F] font-bold py-2 px-3 rounded-xl text-xs transition-all cursor-pointer shadow-sm text-center"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectOptional}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                  isLight
                    ? "border-[#CAE4DB] bg-slate-50 text-[#00303F] hover:border-[#DCAE1D]"
                    : "border-[#7A9D96]/40 bg-[#001f29] text-[#CAE4DB] hover:border-[#DCAE1D]"
                }`}
              >
                Reject Optional
              </button>
            </div>
          </div>
        ) : (
          /* Preferences Panel */
          <div className="space-y-3 pt-1">
            {/* Essential (Locked) */}
            <div
              className={`p-3 rounded-xl border flex items-start justify-between gap-3 ${
                isLight ? "bg-slate-50 border-[#CAE4DB]" : "bg-[#001c26] border-[#7A9D96]/30"
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#DCAE1D]" />
                  <span>Essential System Storage</span>
                </div>
                <p className="text-[10px] text-[#7A9D96] mt-0.5">
                  Required for core site operation, theme preservation, and security. Cannot be disabled.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#DCAE1D] bg-[#00303F] px-2 py-0.5 rounded-full mt-1 shrink-0">
                Always On
              </span>
            </div>

            {/* Analytics (Toggleable) */}
            <div
              className={`p-3 rounded-xl border flex items-start justify-between gap-3 ${
                isLight ? "bg-slate-50 border-[#CAE4DB]" : "bg-[#001c26] border-[#7A9D96]/30"
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <Settings2 className="w-3.5 h-3.5 text-[#7A9D96]" />
                  <span>Performance &amp; Discovery Metrics</span>
                </div>
                <p className="text-[10px] text-[#7A9D96] mt-0.5">
                  Anonymous interaction metrics to help improve pathway accuracy. No personal data collected.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-1 shrink-0">
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-600 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#DCAE1D]"></div>
              </label>
            </div>

            {/* Save Custom Preferences */}
            <div className="flex items-center justify-between gap-2 pt-2">
              <button
                onClick={() => setShowPreferences(false)}
                className="text-xs text-[#7A9D96] hover:text-[#DCAE1D] cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleSaveCustom}
                className="bg-[#DCAE1D] hover:opacity-90 active:scale-95 text-[#00303F] font-bold py-2 px-4 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Preferences</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default CookieConsent;
