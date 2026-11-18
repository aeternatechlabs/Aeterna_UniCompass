import {
  EDUCATION_OPTIONS,
  FIELD_OPTIONS,
  BUDGET_OPTIONS,
  DESTINATION_OPTIONS,
} from "../data/mockData";
import type { PathwayFilter, ThemeMode } from "../types";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

interface PathwayFinderProps {
  theme: ThemeMode;
  filter: PathwayFilter;
  onFilterChange: (key: keyof PathwayFilter, Value: string) => void;
  onExploreClick: () => void;
  onDetailedClick: () => void;
}

export const PathwayFinder: React.FC<PathwayFinderProps> = ({
  theme,
  filter,
  onFilterChange,
  onExploreClick,
  onDetailedClick,
}) => {
  const isLight = theme === "light";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative z-30 max-w-6xl mx-auto px-4 -mt-12 sm:-mt-14 font-sans"
      id="pathways"
    >
      <div
        className={`rounded-2xl p-5 sm:p-7 shadow-xl transition-colors duration-200 ${
          isLight
            ? "bg-white border border-[#CAE4DB] shadow-[#00303F]/5"
            : "bg-[#002632] border border-[#7A9D96]/40 shadow-black/40"
        }`}
      >
        {/* Top title line */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b ${isLight ? "border-[#CAE4DB]" : "border-[#7A9D96]/20"}`}
        >
          <div className="flex items-center gap-2">
            <h2
              className={`text-base sm:text-lg font-bold tracking-tight ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              Find a study pathway that fits you
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={onExploreClick}
              className={`transition-colors cursor-pointer flex items-center gap-1 ${
                isLight
                  ? "text-[#00303F] hover:text-[#DCAE1D]"
                  : "text-[#DCAE1D]"
              }`}
            >
              <span>+ Quick discovery</span>
            </button>
            <span className="text-[#7A9D96]">|</span>
            <button
              onClick={onDetailedClick}
              className="text-[#7A9D96] hover:text-[#DCAE1D] transition-colors cursor-pointer"
            >
              Detailed pathways
            </button>
          </div>
        </div>
        {/* 4 Form inputs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5 pb-5 items-end">
          {/* 1: Current Education */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#7A9D96]">
              YOUR CURRENT EDUCATION
            </label>
            <div className="relative">
              <select
                value={filter.education}
                onChange={(e) => onFilterChange("education", e.target.value)}
                className={`w-full appearance-none rounded-lg px-3.5 py-2.5 text-xs font-semibold focus:outline-none transition-all cursor-pointer pr-8 ${
                  isLight
                    ? "bg-[#CAE4DB]/25 border border-[#7A9D96]/40 text-[#00303F] focus:border-[#DCAE1D]"
                    : "bg-[#001f29] border border-[#7A9D96]/40 text-[#CAE4DB] focus:border-[#DCAE1D]"
                }`}
              >
                {EDUCATION_OPTIONS.map((edu) => (
                  <option
                    key={edu}
                    value={edu}
                    className={
                      isLight
                        ? "text-[#00303F] bg-white"
                        : "text-[#CAE4DB] bg-[#002632]"
                    }
                  >
                    {edu}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#7A9D96] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          {/* 2: Field of Interest */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#7A9D96]">
              FIELD OF INTEREST
            </label>
            <div className="relative">
              <select
                value={filter.field}
                onChange={(e) => onFilterChange("field", e.target.value)}
                className={`w-full appearance-none rounded-lg px-3.5 py-2.5 text-xs font-semibold focus:outline-none transition-all cursor-pointer pr-8 ${
                  isLight
                    ? "bg-[#CAE4DB]/25 border border-[#7A9D96]/40 text-[#00303F] focus:border-[#DCAE1D]"
                    : "bg-[#001f29] border border-[#7A9D96]/40 text-[#CAE4DB] focus:border-[#DCAE1D]"
                }`}
              >
                {FIELD_OPTIONS.map((field) => (
                  <option
                    key={field}
                    value={field}
                    className={
                      isLight
                        ? "text-[#00303F] bg-white"
                        : "text-[#CAE4DB] bg-[#002632]"
                    }
                  >
                    {field}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#7A9D96] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 3: Annual Budget */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#7A9D96]">
              ANNUAL BUDGET
            </label>
            <div className="relative">
              <select
                value={filter.budget}
                onChange={(e) => onFilterChange("budget", e.target.value)}
                className={`w-full appearance-none rounded-lg px-3.5 py-2.5 text-xs font-semibold focus:outline-none transition-all cursor-pointer pr-8 ${
                  isLight
                    ? "bg-[#CAE4DB]/25 border border-[#7A9D96]/40 text-[#00303F] focus:border-[#DCAE1D]"
                    : "bg-[#001f29] border border-[#7A9D96]/40 text-[#CAE4DB] focus:border-[#DCAE1D]"
                }`}
              >
                {BUDGET_OPTIONS.map((bg) => (
                  <option
                    key={bg}
                    value={bg}
                    className={
                      isLight
                        ? "text-[#00303F] bg-white"
                        : "text-[#CAE4DB] bg-[#002632]"
                    }
                  >
                    {bg}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#7A9D96] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          {/* 4: Destination */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#7A9D96]">
              DESTINATION
            </label>
            <div className="relative">
              <select
                value={filter.destination}
                onChange={(e) => onFilterChange("destination", e.target.value)}
                className={`w-full appearance-none rounded-lg px-3.5 py-2.5 text-xs font-semibold focus:outline-none transition-all cursor-pointer pr-8 ${
                  isLight
                    ? "bg-[#CAE4DB]/25 border border-[#7A9D96]/40 text-[#00303F] focus:border-[#DCAE1D]"
                    : "bg-[#001f29] border border-[#7A9D96]/40 text-[#CAE4DB] focus:border-[#DCAE1D]"
                }`}
              >
                {DESTINATION_OPTIONS.map((dest) => (
                  <option
                    key={dest}
                    value={dest}
                    className={
                      isLight
                        ? "text-[#00303F] bg-white"
                        : "text-[#CAE4DB] bg-[#002632]"
                    }
                  >
                    {dest}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#7A9D96] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
        {/* Action row */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t ${
            isLight ? "border-[#CAE4DB]" : "border-[#7A9D96]/20"
          }`}
        >
          <p className="text-[11px] text-[#7A9D96] text-center sm:text-left">
            We are dedicated to personal guidance discovery, unbiased
            exploration and direct links to institutions.
          </p>
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto bg-[#DCAE1D] hover:opacity-90 active:scale-95 text-[#00303F] font-bold px-6 py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span>Explore my options</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
