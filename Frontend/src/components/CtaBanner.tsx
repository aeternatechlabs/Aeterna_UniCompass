import React from "react";
import { ArrowRight } from "lucide-react";
import type { ThemeMode } from "../types";

interface CtaBannerProps {
  theme: ThemeMode;
  onOpenAiGuide: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  theme,
  onOpenAiGuide,
}) => {
  const isLight = theme === "light";

  return (
    <section
      className={`w-full py-12 px-4 sm:px-8 transition-colors duration-200 font-sans ${
        isLight ? "bg-white" : "bg-[#001f29]"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-[#00303F] rounded-2xl p-8 sm:p-10 border border-[#7A9D96]/40 shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Subtle Cerulean/Mist decorative radial aura */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#7A9D96]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Left Text */}
          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Not sure where to begin?
            </h3>
            <p className="text-xs sm:text-sm text-[#CAE4DB] leading-relaxed font-normal">
              Talk to our discovery global education assistant and explore your
              next idea. AI discovery is evolving rapidly; verify admission
              criteria with institutions and authorities.
            </p>
          </div>

          {/* Right Action Button */}
          <div className="relative z-10 shrink-0">
            <button
              onClick={onOpenAiGuide}
              className="bg-[#DCAE1D] hover:opacity-90 active:scale-95 text-[#00303F] font-bold px-6 py-3 rounded-lg text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg cursor-pointer whitespace-nowrap"
            >
              <span>Ask the AI Guide</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
