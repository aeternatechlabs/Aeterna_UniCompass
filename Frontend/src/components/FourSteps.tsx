import React from "react";
import type { ThemeMode } from "../types";

interface FourStepsProps {
  theme: ThemeMode;
}

export const FourSteps: React.FC<FourStepsProps> = ({ theme }) => {
  const isLight = theme == "light";
  const steps = [
    {
      num: "01",
      title: "Tell us about you",
      desc: "Share your academic history, budget and preferred study destinations.",
    },
    {
      num: "02",
      title: "Discover your matches",
      desc: "Explore programmes and universities matching your requirements.",
    },
    {
      num: "03",
      title: "Compare and plan",
      desc: "Review tuition fees, living costs, scholarships and timelines.",
    },
    {
      num: "04",
      title: "Get expert guidance",
      desc: "Request consultation, scholarship assessment and application advice.",
    },
  ];
  return (
    <section
      className={`w-full py-16 sm:py-20 transition-colors duration-200 font-sans border-t ${
        isLight
          ? "bg-[#CAE4DB]/15 border-[#CAE4DB]"
          : "bg-[#002632] border-[#7A9D96]/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/*Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2 text-[#7A9D96]">
            Simple by Design
          </p>
          <h2
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? "text-[#00303F]" : "text-[#CAE4DB]"}`}
          >
            Your global journey in four steps.
          </h2>
        </div>
        {/*4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex flex-col items-start relative group"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-[#7A9D96]/50 group-hover:text-[#DCAE1D] transition-colors mb-3">
                {step.num}
              </span>
              <h3
                className={`text-base font-bold mb-2 ${
                  isLight ? "text-[#00303F]" : "text-white"
                }`}
              >
                {step.title}
              </h3>
              <p className="text-xs text-[#7A9D96] leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
