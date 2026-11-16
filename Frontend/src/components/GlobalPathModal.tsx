import React from "react";
import {
  X,
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
  Wallet,
  Compass,
} from "lucide-react";
import type { PathwayFilter, ThemeMode } from "../types";

interface GlobalPathModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  filters: PathwayFilter;
  onDiscussWithAeterna: () => void;
}

export const GlobalPathModal: React.FC<GlobalPathModalProps> = ({
  isOpen,
  onClose,
  theme,
  filters,
  onDiscussWithAeterna,
}) => {
  if (!isOpen) return null;

  const isLight = theme === "light";
  const isGermany = filters.destination.toLowerCase().includes("germany");
  const isAus = filters.destination.toLowerCase().includes("australia");
  const destinationDisplay =
    filters.destination === "Open to all countries"
      ? "United Kingdom (Primary Recommendation)"
      : filters.destination;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#00303F]/80 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div
        className={`rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl relative border max-h-[92vh] overflow-y-auto ${
          isLight
            ? "bg-white border-[#CAE4DB] text-[#00303F]"
            : "bg-[#002632] border-[#7A9D96]/40 text-[#CAE4DB]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#7A9D96] hover:text-[#DCAE1D] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-8 mb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[#DCAE1D] font-bold text-lg">✦</span>
            <h2
              className={`text-lg sm:text-xl font-bold tracking-tight ${isLight ? "text-[#00303F]" : "text-white"}`}
            >
              Your GlobalPath discovery preview
            </h2>
          </div>
          <p className="text-xs text-[#7A9D96] leading-relaxed">
            Based on your choices, we found matching opportunities: academic
            suitability, tuition pathways, verified cost estimates, and
            admission benchmarks across destination universities.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6 text-xs">
          {/* Card 1: Your search profile */}
          <div
            className={`rounded-xl p-4 border ${
              isLight
                ? "bg-[#CAE4DB]/20 border-[#CAE4DB]"
                : "bg-[#001f29] border-[#7A9D96]/30"
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-2 text-[#DCAE1D]">
              <Compass className="w-4 h-4" />
              <span>Your search profile</span>
            </div>
            <p
              className={`font-bold ${isLight ? "text-[#00303F]" : "text-white"}`}
            >
              {filters.education} · {filters.field}
            </p>
            <p className="text-[#7A9D96] mt-1">
              Budget:{" "}
              <span className="font-semibold text-[#DCAE1D]">
                {filters.budget}
              </span>{" "}
              · Destination:{" "}
              <span
                className={`font-semibold ${isLight ? "text-[#00303F]" : "text-[#CAE4DB]"}`}
              >
                {destinationDisplay}
              </span>
            </p>
          </div>

          {/* Card 2: Academic fit check */}
          <div
            className={`rounded-xl p-4 border ${
              isLight
                ? "bg-[#CAE4DB]/20 border-[#CAE4DB]"
                : "bg-[#001f29] border-[#7A9D96]/30"
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-2 text-[#DCAE1D]">
              <ShieldCheck className="w-4 h-4" />
              <span>Academic fit check</span>
            </div>
            <p className="leading-relaxed text-[#7A9D96]">
              {isGermany ? (
                <>
                  Direct eligibility for top German TU9 institutions with
                  verified APS certificate and min. 70% undergraduate or Abitur
                  equivalent.
                </>
              ) : isAus ? (
                <>
                  Meets direct criteria for Australian Go8 faculties with
                  verified IELTS 6.5–7.0 admission prerequisites.
                </>
              ) : (
                <>
                  Direct eligibility for leading UK Russell Group & state-health
                  alliance faculties with verified IELTS 6.5–7.0 admission
                  prerequisites.
                </>
              )}
            </p>
          </div>

          {/* Card 3: True cost planner */}
          <div
            className={`rounded-xl p-4 border ${
              isLight
                ? "bg-[#CAE4DB]/20 border-[#CAE4DB]"
                : "bg-[#001f29] border-[#7A9D96]/30"
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-2 text-[#DCAE1D]">
              <Wallet className="w-4 h-4" />
              <span>True cost planner</span>
            </div>
            <p className="leading-relaxed text-[#7A9D96]">
              {isGermany ? (
                <>
                  Tuition: €0 public. Living & blocked account: €11,208/yr.
                  Student work permit allows up to 140 full days/year.
                </>
              ) : isAus ? (
                <>
                  Tuition: A$32k–42k/yr. Living & OSHC: A$24,500/yr. Work rights
                  up to 48 hrs/fortnight during active semester.
                </>
              ) : (
                <>
                  Tuition: £14k–20k/yr. Living: UKVI maintenance
                  £1,023–£1,347/month. Part-time work allowance up to 20h/week
                  during term.
                </>
              )}
            </p>
          </div>

          {/* Card 4: Intake & deadline finder */}
          <div
            className={`rounded-xl p-4 border ${
              isLight
                ? "bg-[#CAE4DB]/20 border-[#CAE4DB]"
                : "bg-[#001f29] border-[#7A9D96]/30"
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-2 text-[#DCAE1D]">
              <Clock className="w-4 h-4" />
              <span>Intake & deadline finder</span>
            </div>
            <p className="leading-relaxed text-[#7A9D96]">
              Upcoming intakes:{" "}
              <span className="font-bold text-[#DCAE1D]">
                Main September 2026
              </span>
              . Early priority deadline: March 31, 2026. Standard CAS visa
              cutoff in July/August.
            </p>
          </div>

          {/* Card 5: Scholarship discovery */}
          <div
            className={`rounded-xl p-4 border ${
              isLight
                ? "bg-[#CAE4DB]/20 border-[#CAE4DB]"
                : "bg-[#001f29] border-[#7A9D96]/30"
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-2 text-[#DCAE1D]">
              <Award className="w-4 h-4" />
              <span>Scholarship discovery</span>
            </div>
            <p className="leading-relaxed text-[#7A9D96]">
              Automatically assessed for international merit waivers (up to
              £4,000 / €3,500) and state-partnered percentage or healthcare bond
              grants.
            </p>
          </div>

          {/* Card 6: Next best steps */}
          <div
            className={`rounded-xl p-4 border ${
              isLight
                ? "bg-[#CAE4DB]/20 border-[#CAE4DB]"
                : "bg-[#001f29] border-[#7A9D96]/30"
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-2 text-[#DCAE1D]">
              <Compass className="w-4 h-4" />
              <span>Next best steps</span>
            </div>
            <p className="leading-relaxed text-[#7A9D96]">
              Download syllabus checklists, request verified credential
              evaluations, and connect with our advisor for direct application
              assistance.
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div
          className={`flex justify-end pt-3 border-t ${isLight ? "border-[#CAE4DB]" : "border-[#7A9D96]/30"}`}
        >
          <button
            onClick={() => {
              onClose();
              onDiscussWithAeterna();
            }}
            className="w-full sm:w-auto bg-[#DCAE1D] hover:opacity-90 active:scale-95 text-[#00303F] font-bold px-6 py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <span>Discuss with Aeterna</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
