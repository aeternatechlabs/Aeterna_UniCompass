import React from "react";
import type { ThemeMode } from "../types";
import { ArrowRight, Check } from "lucide-react";

interface SmartMatchSectionProps {
  theme: ThemeMode;
  onStartSmartMatch: () => void;
}

export const SmartMatchSection: React.FC<SmartMatchSectionProps> = ({
  theme,
  onStartSmartMatch,
}) => {
  const isLight = theme == "light";
  return (
    <section
      id="smart-match"
      className={`w-full py-16 sm:py-20 transition-colors duration-200 overflow-hidden font-sans ${
        isLight ? "bg-white" : "bg-[#001f29]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Photo with floating AI badge */}
          <div className="lg:col-span-6 relative">
            <div
              className={`rounded-2xl overflow-hidden shadow-xl border aspect-4/3 sm:aspect-16/11 ${
                isLight ? "border-[#CAE4DB]" : "border-[#7A9D96]/30"
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80"
                alt="Students studying in classical library"
                className="w-full h-full object-cover filter contrast-105"
              />
            </div>

            {/* Floating dark tag in bottom left of photo */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 max-w-[280px] sm:max-w-xs bg-[#00303F]/95 backdrop-blur-md border border-[#DCAE1D]/50 rounded-xl p-3.5 shadow-2xl text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#DCAE1D]"></span>
                <p className="text-[11px] font-bold tracking-tight text-white">
                  AI: Your profile. Your possibilities.
                </p>
              </div>
              <p className="text-[10px] text-[#CAE4DB] font-medium">
                Intelligent matching for global education
              </p>
            </div>
          </div>

          {/* Right Column: Copy & Checklist */}
          <div className="lg:col-span-6 flex flex-col items-start space-y-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7A9D96] mb-2">
                PERSONALISED INTELLIGENCE
              </p>
              <h2
                className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 ${
                  isLight ? "text-[#00303F]" : "text-[#CAE4DB]"
                }`}
              >
                Meet your Global <br className="hidden sm:inline" />
                Smart Match.
              </h2>
              <p className="text-xs sm:text-sm text-[#7A9D96] leading-relaxed font-normal">
                Not a wish-list of universities. A guided discovery engine that
                compares your academic background, budget, subject interests and
                preferred destinations against published programme requirements.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3.5 w-full">
              {[
                "Explore academic fit indicators",
                "Tuition and living cost comparison",
                "Upcoming intakes and application timelines",
                "Official university and government data links",
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 text-xs font-semibold ${
                    isLight ? "text-[#00303F]" : "text-[#CAE4DB]"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#CAE4DB] flex items-center justify-center text-[#00303F] shrink-0 font-bold">
                    <Check className="w-2.5 h-2.5 stroke-3" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action button */}
            <div className="pt-2">
              <button
                onClick={onStartSmartMatch}
                className="bg-[#DCAE1D] hover:opacity-90 active:scale-95 text-[#00303F] font-bold px-6 py-3 rounded-lg text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Start my Smart Match</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
