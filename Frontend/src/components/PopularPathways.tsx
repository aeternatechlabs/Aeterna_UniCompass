import React from "react";
import type { ThemeMode } from "../types";
import { AMBITION_CARDS } from "../data/mockData";
import { ArrowRight } from "lucide-react";

interface PopularPathwaysProps {
  theme: ThemeMode;
  onSelectField: (fieldName: string) => void;
}

export const PopularPathways: React.FC<PopularPathwaysProps> = ({
  theme,
  onSelectField,
}) => {
  const isLight = theme == "light";
  return (
    <section
      id="pathways"
      className={`w-full py-16 transition-colors duration-200 border-t font-sans ${
        isLight
          ? "bg-[#CAE4DB]/15 border-[#CAE4DB]"
          : "bg-[#002632] border-[#7A9D96]/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7A9D96] mb-2">
            choose Your Ambition
          </p>
          <h2
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${
              isLight ? "text-[#00303F]" : "text-[#CAE4DB]"
            }`}
          >
            Popular pathways. Global opportunities.
          </h2>
          <p className="text-xs sm:text-sm text-[#7A9D96] leading-relaxed font-normal ">
            From medical education to future technologies, explore programmes
            that match your interests and long-term plans.
          </p>
        </div>
        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMBITION_CARDS.map((card) => (
            <div
              key={card.id}
              className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border ${
                isLight
                  ? "bg-white border-[#CAE4DB]"
                  : "bg-[#001f29] border-[#7A9D96]/30"
              }`}
            >
              {/* Image with category pill */}
              <div className="relative overflow-hidden h-44">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#00303F]/20"></div>
                <div className="absolute top-3 left-3 bg-[#00303F] text-[#DCAE1D] border border-[#DCAE1D]/50 px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shadow-sm">
                  {card.category}
                </div>
              </div>
              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className={`text-base font-bold mb-2 group-hover:text-[#DCAE1D] transition-colors ${
                      isLight ? "text-[#00303F]" : "text-white"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#7A9D96] leading-relaxed font-normal mb-4">
                    {card.description}
                  </p>
                </div>

                {/* Link */}
                <button
                  onClick={() => onSelectField(card.title)}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold pt-3 border-t transition-colors cursor-pointer ${
                    isLight
                      ? "border-[#CAE4DB] text-[#00303F] hover:text-[#DCAE1D]"
                      : "border-[#7A9D96]/20 text-[#CAE4DB] hover:text-[#DCAE1D]"
                  }`}
                >
                  <span>{card.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
