import React from "react";
import type { ThemeMode } from "../types";
import { motion } from "framer-motion";

interface HeroProps {
  theme: ThemeMode;
  onDiscoverClick: () => void;
  onSeeHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  theme,
  onDiscoverClick,
  onSeeHowItWorksClick,
}) => {
  const isLight = theme === "light";

  return (
    <section className="relative w-full bg-[#00303F] text-white pt-15 pb-28 sm:pb-32 overflow-hidden font-sans">
      {/* Background architectural image: exact provided asset */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          key={theme}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          src="/src/assets/Hero.png"
          alt="Majestic Historic University Campus"
          className="w-full h-full object-cover object-center filter contrast-125"
        />
        {/* Soft gradient overlay at the bottom/edges only so text remains readable */}
        <div className="absolute inset-0 bg-linear-to-t from-[#00303F] via-[#00303F]/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Pill badge matching screenshot */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00303F]/80 border border-[#DCAE1D]/50 text-[#DCAE1D] text-[11px] font-bold tracking-wider uppercase backdrop-blur-sm shadow-sm">
              <span>A SMARTER WAY TO STUDY THE WORLD</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Your future has <br />
              <span>no borders</span>
              <span className="text-[#DCAE1D]">.</span>
            </h1>

            {/* Subtitle in Morning Sky (#CAE4DB) */}
            <p className="text-[#CAE4DB] text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
              Explore global universities, compare real study costs, discover
              upcoming intakes and find the right education pathway—with an
              AI-powered guide by your side.
            </p>

            {/* Action buttons*/}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {/* Primary Button */}
              <button
                onClick={onDiscoverClick}
                className="relative group overflow-hidden bg-[#DCAE1D] hover:bg-[#e6be32] text-[#00303F] font-bold px-6 py-2.5 rounded-md text-xs sm:text-sm shadow-md hover:shadow-lg hover:shadow-[#DCAE1D]/20 active:scale-95 transition-all duration-200 cursor-pointer translate-y-0 hover:-translate-y-0.5"
              >
                {/* Subtle light sheen sweep effect on hover */}
                <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                <span className="relative z-10">Discover My Global Path</span>
              </button>

              {/* Secondary Button */}
              <button
                onClick={onSeeHowItWorksClick}
                className="bg-[#00303F]/60 hover:bg-[#00303F] border border-[#7A9D96]/60  text-[#CAE4DB] hover:text-white font-medium px-5 py-2.5 rounded-md text-xs sm:text-sm shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer backdrop-blur-sm-translate-y-0 hover:-translate-y-0.5"
              >
                See how it works
              </button>
            </div>

            {/* Value propositions */}
            <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#CAE4DB]">
              <span className="hover:text-white transition-colors">
                Personalised recommendations
              </span>
              <span className="text-[#7A9D96]">·</span>
              <span className="hover:text-white transition-colors">
                Transparent cost planning
              </span>
              <span className="text-[#7A9D96]">·</span>
              <span className="hover:text-white transition-colors">
                Discovery-first exploration
              </span>
            </div>
          </div>

          {/* Right Column: Floating Glass Card (01 / 100+) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              className={`w-full max-w-sm rounded-2xl p-6 sm:p-7 shadow-2xl transition-all duration-300 ${
                isLight
                  ? "bg-white text-[#00303F] border border-[#CAE4DB]"
                  : "bg-[#002632] text-[#CAE4DB] border border-[#7A9D96]/40"
              }`}
            >
              {/* Counter header */}
              <div className="flex items-baseline gap-1.5 pb-2.5">
                <span className="text-[#DCAE1D] font-extrabold text-3xl tracking-tight">
                  01
                </span>
                <span
                  className={`text-lg font-bold ${
                    isLight ? "text-[#00303F]" : "text-[#CAE4DB]"
                  }`}
                >
                  / 100+
                </span>
              </div>

              {/* Title & subtitle */}
              <h3
                className={`text-base font-bold mb-1.5 ${
                  isLight ? "text-[#00303F]" : "text-white"
                }`}
              >
                One compass. A world of choices.
              </h3>
              <p className="text-xs text-[#7A9D96] font-medium mb-3">
                Compare universities, and explore options.
              </p>

              {/* Description */}
              <p
                className={`text-xs leading-relaxed pt-3 border-t ${
                  isLight
                    ? "border-[#CAE4DB] text-[#7A9D96]"
                    : "border-[#7A9D96]/30 text-[#CAE4DB]"
                }`}
              >
                Intelligent discovery, transparent planning, and actionable
                guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
