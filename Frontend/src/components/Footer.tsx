import React from "react";
import type { ThemeMode } from "../types";
import logoImg from "../assets/Logo.webp";

interface FooterProps {
  theme: ThemeMode;
  onOpenSmartMatch: () => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenGlobalPath: () => void;
  onOpenAssistance: (modalType: "counselling" | "advisor" | "support") => void;
  onNavigate?: (path: string) => void;
  onOpenCookiePreferences?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSmartMatch,
  onScrollToSection,
  onOpenGlobalPath,
  onOpenAssistance,
  onNavigate,
  onOpenCookiePreferences,
}) => {
  return (
    <footer className="w-full bg-[#001f29] text-[#CAE4DB] pt-16 pb-12 border-t border-[#7A9D96]/30 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* 4 Column Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#7A9D96]/20 text-xs">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div
              onClick={() => {
                if (onNavigate) {
                  onNavigate("/");
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-[#00303F] border border-[#DCAE1D] flex items-center justify-center text-[#DCAE1D] group-hover:rotate-45 transition-transform duration-300">
                <img
                  src={logoImg}
                  alt="Aeterna Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-bold tracking-wider text-white font-serif group-hover:text-[#DCAE1D] transition-colors">
                AETERNA
              </span>
            </div>
            <p className="text-[#7A9D96] leading-relaxed font-normal">
              Your AI-powered global education discovery companion. Search.
              Match. Explore.
            </p>
          </div>

          {/* Col 2: Explore */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-[#7A9D96]">
              <li>
                <button
                  onClick={() => onScrollToSection("destinations")}
                  className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
                >
                  Study Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("pathways")}
                  className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGlobalPath}
                  className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
                >
                  Global Universities
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSmartMatch}
                  className="hover:text-[#DCAE1D] transition-colors cursor-pointer text-[#DCAE1D]"
                >
                  AI Smart Match
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Plan */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Plan
            </h4>
            <ul className="space-y-2 text-[#7A9D96]">
              <li>
                <button
                  onClick={onOpenSmartMatch}
                  className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
                >
                  AI Smart Match
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGlobalPath}
                  className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
                >
                  Admission Intake
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("compare-costs")}
                  className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
                >
                  Cost comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection("summer-schools")}
                  className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
                >
                  Short programmes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Student Assistance */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Student Assistance
            </h4>

            <ul className="space-y-2 text-[#7A9D96]">
              <li>
                <button
                  onClick={() => onOpenAssistance("counselling")}
                  className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
                >
                  Request Counselling
                </button>
              </li>

              <li>
                <button
                  onClick={() => onOpenAssistance("advisor")}
                  className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
                >
                  Speak with an Advisor
                </button>
              </li>

              <li>
                <button
                  onClick={() => onOpenAssistance("support")}
                  className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
                >
                  Student Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A9D96]">
          <p>
            © 2026 Aeterna / Global Ai. All rights reserved. Designed with
            verified institutional datasets.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[#CAE4DB]">
            <button
              onClick={() => onNavigate?.("/privacy-policy")}
              className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-[#7A9D96]">·</span>
            <button
              onClick={() => onNavigate?.("/terms-and-conditions")}
              className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span className="text-[#7A9D96]">·</span>
            <button
              onClick={() => onScrollToSection("compare-costs")}
              className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
            >
              Verification Standards
            </button>
            {onOpenCookiePreferences && (
              <>
                <span className="text-[#7A9D96]">·</span>
                <button
                  onClick={onOpenCookiePreferences}
                  className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
                >
                  Cookie Preferences
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
