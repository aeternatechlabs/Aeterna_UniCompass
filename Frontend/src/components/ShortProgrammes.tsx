import React from "react";
import type { ThemeMode } from "../types";
import { ArrowRight, FlaskConical, Globe2, GraduationCap } from "lucide-react";

interface ShortProgrammesProps {
  theme: ThemeMode;
  onLearnMore: (type: string) => void;
}

export const ShortProgrammes: React.FC<ShortProgrammesProps> = ({
  theme,
  onLearnMore,
}) => {
  const isLight = theme == "light";

  const programmes = [
    {
      id: "summer",
      title: "University Summer Schools",
      description:
        "Short academic programmes, campus experiences and subject exploration for eligible students.",
      icon: GraduationCap,
    },
    {
      id: "stem",
      title: "Research & STEM Camps",
      description:
        "Hands-on STEM, engineering, medicine and laboratory-based learning opportunities.",
      icon: FlaskConical,
    },
    {
      id: "exchange",
      title: "Exchange & Cultural Learning",
      description:
        "Short-term international harmony experiences, language programmes and cultural exchanges.",
      icon: Globe2,
    },
  ];

  return (
    <section
      id="summer-schools"
      className={`w-full py-16 sm:py-20 transition-colors duration-200 font-sans ${isLight ? "bg-white" : "bg-[#001f29]"} `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7A9D96] mb-2">
            Beyond Full Degrees
          </p>
          <h2
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${isLight ? "text-[#00303F]" : "text-[#CAE4DB]"}`}
          >
            Short programmes. Big experiences.
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed font-normal text-[#7A9D96]">
            Discover summer schools, winter schools, research programmes,
            exchange opportunities and subject-specific camps.
          </p>
        </div>

        {/* 3 Card */}
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
          {programmes.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                onClick={() => onLearnMore(p.title)}
                className={`rounded-2xl p-6 border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:translate-y-1 ${
                  isLight
                    ? "bg-white border-[#CAE4DB]"
                    : "bg-[#002632] border-[#7A9D96]/30"
                }`}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#00303F] border border-[#DCAE1D]/50 flex items-center justify-center mb-5 text-[#DCAE1D] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3
                    className={`text-base font-bold mb-2 transition-colors group-hover:[#DCAE1D] ${isLight ? "text-[#00303F]" : "text-white"}`}
                  >
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#7A9D96] leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div
                  className={`pt-4 mt-4 border-t flex items-center justify-between text-xs font-bold transition-colors ${
                    isLight
                      ? "border-[#CAE4DB] text-[#00303F] group-hover:text-[#DCAE1D]"
                      : "border-[#7A9D96]/20 text-[#CAE4DB] group-hover:text-[#DCAE1D]"
                  }`}
                >
                  <span>Explore opportunities</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
