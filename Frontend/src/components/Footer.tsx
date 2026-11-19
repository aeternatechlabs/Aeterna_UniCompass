import React from "react";
import type { ThemeMode } from "../types";

interface FooterProps {
  theme: ThemeMode;
  onOpenSmartMatch: () => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenGlobalPath: () => void;
  onOpenAssistance: (modalType: "counselling" | "advisor" | "support") => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSmartMatch,
  onScrollToSection,
  onOpenGlobalPath,
  onOpenAssistance,
}) => {
  return (
    <footer className="w-full bg-[#001f29] text-[#CAE4DB] pt-16 pb-12 border-t border-[#7A9D96]/30 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* 4 Column Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#7A9D96]/20 text-xs">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#00303F] border border-[#DCAE1D] flex items-center justify-center text-[#DCAE1D]">
                <img
                  src="/src/assets/Logo.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-bold tracking-wider text-white font-serif">
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
                  className="hover:text-[#DCAE1D] transition-colors"
                >
                  Request Counselling
                </button>
              </li>

              <li>
                <button
                  onClick={() => onOpenAssistance("advisor")}
                  className="hover:text-[#DCAE1D] transition-colors"
                >
                  Speak with an Advisor
                </button>
              </li>

              <li>
                <button
                  onClick={() => onOpenAssistance("support")}
                  className="hover:text-[#DCAE1D] transition-colors"
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
          <div className="flex items-center gap-4 text-[#CAE4DB]">
            <span className="hover:text-[#DCAE1D] cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-[#7A9D96]">·</span>
            <span className="hover:text-[#DCAE1D] cursor-pointer">
              Terms of Service
            </span>
            <span className="text-[#7A9D96]">·</span>
            <span className="hover:text-[#DCAE1D] cursor-pointer">
              Verification Standards
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
