import React, { useState } from "react";
import { X, Check, ArrowRight, Loader2, ChevronDown } from "lucide-react";
import type {
  ProfileEvaluationInput,
  ProfileEvaluationResult,
  ThemeMode,
} from "../types";
import {
  EDUCATION_OPTIONS,
  FIELD_OPTIONS,
  BUDGET_OPTIONS,
  DESTINATION_OPTIONS,
} from "../data/mockData";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface SmartMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  onDiscussWithAeterna: () => void;
}

export const SmartMatchModal: React.FC<SmartMatchModalProps> = ({
  isOpen,
  onClose,
  theme,
  onDiscussWithAeterna,
}) => {
  const isLight = theme === "light";

  const [profile, setProfile] = useState<ProfileEvaluationInput>({
    undergraduateCourse: "B.Tech Computer Science / 8.4 CGPA",
    targetDestination: "United Kingdom (Top 15 / Russell Group)",
    fieldOfSpecialisation: "M.Sc. Finance & Business Analytics",
    targetBudget: "₹18 - ₹25 Lakhs ($21k - $30k) / Year",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ProfileEvaluationResult | null>({
    matchedUniversity: "University of Manchester & Edinburgh",
    fitLevel: "High Fit / Strong Track",
    fitAssessment:
      "Your 8.35 CGPA satisfies Tier-1/2 First Class conversion standard (Russell tier equiv 67%+), fulfilling standard admission threshold for leading faculty departments.",
    academicCheck: "Academic percentage meets direct qualification criteria",
    englishReq:
      "English language requirement: Waived with CBSE/ISC >75% or standard IELTS 6.5",
    visaRoute: "Eligible for 2-year Graduate Route post-study work visa",
  });

  if (!isOpen) return null;

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/evaluate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.data) {
        throw new Error(data.message || "Profile evaluation failed");
      }

      // Backend returns the result inside data.data
      setResult(data.data);
    } catch (error) {
      console.error("Profile Evaluation Error:", error);

      // Keep your existing local fallback
      generateLocalResult(profile);
    } finally {
      setLoading(false);
    }
  };

  const generateLocalResult = (p: ProfileEvaluationInput) => {
    const isGermany = p.targetDestination.toLowerCase().includes("germany");
    const isAus = p.targetDestination.toLowerCase().includes("aus");

    if (isGermany) {
      setResult({
        matchedUniversity: "TU Munich & RWTH Aachen",
        fitLevel: "High Fit / Excellent Match",
        fitAssessment:
          "Your academic profile converts to German GPA 1.6–1.8 (Bavarian Formula), qualifying for competitive NC (Numerus Clausus) Master’s admissions with €0 tuition.",
        academicCheck:
          "Meets direct academic prerequisites & ECTS credit distributions",
        englishReq:
          "English-taught pathway: Waived with medium of instruction or IELTS 6.5",
        visaRoute:
          "Eligible for 18-month Jobseeker / Chancenkarte post-study residency",
      });
    } else if (isAus) {
      setResult({
        matchedUniversity: "University of Melbourne & Sydney",
        fitLevel: "Tier 1 Qualified / Direct Entry",
        fitAssessment:
          "Your CGPA comfortably clears the Group of Eight (Go8) threshold of 65%+ Section 1 university conversion for master’s entry.",
        academicCheck:
          "Academic percentage exceeds standard entry prerequisites",
        englishReq:
          "English criteria met with PTE Academic 65 or IELTS Academic 6.5",
        visaRoute:
          "Eligible for 2–4 year Temporary Graduate Visa (subclass 485)",
      });
    } else {
      setResult({
        matchedUniversity: "University of Manchester & Edinburgh",
        fitLevel: "High Fit / Strong Track",
        fitAssessment:
          "Your CGPA satisfies Tier-1/2 First Class conversion standard (Russell tier equiv 67%+), fulfilling standard admission threshold for leading faculty departments.",
        academicCheck:
          "Academic percentage meets direct qualification criteria",
        englishReq:
          "English language requirement: Waived with CBSE/ISC >75% or standard IELTS 6.5",
        visaRoute: "Eligible for 2-year Graduate Route post-study work visa",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#00303F]/80 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="smartmatch-modal-title"
        className={`rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative border max-h-[92vh] overflow-y-auto ${
          isLight
            ? "bg-white border-[#CAE4DB] text-[#00303F]"
            : "bg-[#002632] border-[#7A9D96]/40 text-[#CAE4DB]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#7A9D96] hover:text-[#DCAE1D] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-5 pr-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A9D96] mb-1">
            PROFILE & COMPATIBILITY EVALUATOR
          </p>
          <h2
            className={`text-lg sm:text-xl font-bold tracking-tight ${isLight ? "text-[#00303F]" : "text-white"}`}
          >
            Assess Your Study Profile
          </h2>
        </div>

        {/* Input Form */}
        <form onSubmit={handleEvaluate} className="space-y-3.5 mb-5">
          {/* 1. Current Education / Education */}
          <div>
            <label className="block text-[11px] font-bold text-[#7A9D96] mb-1">
              Education Level / Current Qualification
            </label>
            <div className="relative">
              <select
                value={profile.undergraduateCourse}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    undergraduateCourse: e.target.value,
                  })
                }
                className={`w-full appearance-none rounded-lg px-3.5 py-2.5 text-xs font-semibold focus:outline-none transition-all cursor-pointer pr-8 ${
                  isLight
                    ? "bg-[#CAE4DB]/25 border border-[#7A9D96]/40 text-[#00303F] focus:border-[#DCAE1D]"
                    : "bg-[#001f29] border border-[#7A9D96]/40 text-[#CAE4DB] focus:border-[#DCAE1D]"
                }`}
                required
              >
                <option value="" disabled>
                  Select your education level
                </option>
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

          {/* 2. Target Study Destination */}
          <div>
            <label className="block text-[11px] font-bold text-[#7A9D96] mb-1">
              Target Study Destination
            </label>
            <div className="relative">
              <select
                value={profile.targetDestination}
                onChange={(e) =>
                  setProfile({ ...profile, targetDestination: e.target.value })
                }
                className={`w-full appearance-none rounded-lg px-3.5 py-2.5 text-xs font-semibold focus:outline-none transition-all cursor-pointer pr-8 ${
                  isLight
                    ? "bg-[#CAE4DB]/25 border border-[#7A9D96]/40 text-[#00303F] focus:border-[#DCAE1D]"
                    : "bg-[#001f29] border border-[#7A9D96]/40 text-[#CAE4DB] focus:border-[#DCAE1D]"
                }`}
                required
              >
                <option value="" disabled>
                  Select destination country
                </option>
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

          {/* 3. Core Field of Specialisation */}
          <div>
            <label className="block text-[11px] font-bold text-[#7A9D96] mb-1">
              Core Field of Specialisation
            </label>
            <div className="relative">
              <select
                value={profile.fieldOfSpecialisation}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    fieldOfSpecialisation: e.target.value,
                  })
                }
                className={`w-full appearance-none rounded-lg px-3.5 py-2.5 text-xs font-semibold focus:outline-none transition-all cursor-pointer pr-8 ${
                  isLight
                    ? "bg-[#CAE4DB]/25 border border-[#7A9D96]/40 text-[#00303F] focus:border-[#DCAE1D]"
                    : "bg-[#001f29] border border-[#7A9D96]/40 text-[#CAE4DB] focus:border-[#DCAE1D]"
                }`}
                required
              >
                <option value="" disabled>
                  Select field of interest
                </option>
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

          {/* 4. Target Annual Budget */}
          <div>
            <label className="block text-[11px] font-bold text-[#7A9D96] mb-1">
              Target Annual Budget
            </label>
            <div className="relative">
              <select
                value={profile.targetBudget}
                onChange={(e) =>
                  setProfile({ ...profile, targetBudget: e.target.value })
                }
                className={`w-full appearance-none rounded-lg px-3.5 py-2.5 text-xs font-semibold focus:outline-none transition-all cursor-pointer pr-8 ${
                  isLight
                    ? "bg-[#CAE4DB]/25 border border-[#7A9D96]/40 text-[#00303F] focus:border-[#DCAE1D]"
                    : "bg-[#001f29] border border-[#7A9D96]/40 text-[#CAE4DB] focus:border-[#DCAE1D]"
                }`}
                required
              >
                <option value="" disabled>
                  Select annual budget range
                </option>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#DCAE1D] hover:opacity-90 active:scale-95 text-[#00303F] font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Evaluating Academic Compatibility...</span>
              </>
            ) : (
              <>
                <span>Evaluate Academic Compatibility</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>

        {/* Results Card */}
        {result && (
          <div
            className={`rounded-xl p-4 sm:p-5 border animate-in fade-in duration-300 ${
              isLight
                ? "bg-[#CAE4DB]/20 border-[#CAE4DB]"
                : "bg-[#001f29] border-[#7A9D96]/30"
            }`}
          >
            <div
              className={`flex items-center justify-between gap-2 mb-2 pb-2 border-b ${
                isLight ? "border-[#CAE4DB]" : "border-[#7A9D96]/20"
              }`}
            >
              <h3
                className={`font-bold text-sm ${isLight ? "text-[#00303F]" : "text-white"}`}
              >
                {result.matchedUniversity}
              </h3>
              <span className="text-[10px] font-bold text-[#00303F] bg-[#DCAE1D] px-2 py-0.5 rounded-full">
                {result.fitLevel}
              </span>
            </div>

            <p className="text-xs text-[#7A9D96] leading-relaxed mb-3">
              {result.fitAssessment}
            </p>

            <div className="space-y-2 text-xs mb-4">
              <div className="flex items-start gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#CAE4DB] flex items-center justify-center text-[#00303F] mt-0.5 shrink-0 font-bold">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className={isLight ? "text-[#00303F]" : "text-[#CAE4DB]"}>
                  {result.academicCheck}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#CAE4DB] flex items-center justify-center text-[#00303F] mt-0.5 shrink-0 font-bold">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className={isLight ? "text-[#00303F]" : "text-[#CAE4DB]"}>
                  {result.englishReq}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#CAE4DB] flex items-center justify-center text-[#00303F] mt-0.5 shrink-0 font-bold">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className={isLight ? "text-[#00303F]" : "text-[#CAE4DB]"}>
                  {result.visaRoute}
                </span>
              </div>
            </div>

            <div
              className={`pt-2 border-t flex justify-end ${isLight ? "border-[#CAE4DB]" : "border-[#7A9D96]/20"}`}
            >
              <button
                onClick={() => {
                  onClose();
                  onDiscussWithAeterna();
                }}
                className="text-xs font-bold text-[#DCAE1D] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Ask AI Advisor about this match</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
