import React from "react";
import type { ThemeMode } from "../types";
import { FlaskConical, Globe2, GraduationCap } from "lucide-react";

interface ShortProgrammesProps {
  theme: ThemeMode;
  onLernMore: (type: string) => void;
}

export const ShortProgrammes: React.FC<ShortProgrammesProps> = ({
  theme,
  onLernMore,
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
        </div>
      </div>
    </section>
  );
};
