import React, { useEffect, useState } from "react";
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

interface GlobalPathPreview {
  searchProfile: string;
  academicFit: string;
  trueCostPlanner: string;
  intakeDeadline: string;
  scholarshipDiscovery: string;
  nextSteps: string;
}

interface GlobalPathApiResponse {
  success: boolean;
  data?: GlobalPathPreview;
  message?: string;
}

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
  const [preview, setPreview] = useState<GlobalPathPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const controller = new AbortController();

    const fetchGlobalPathPreview = async () => {
      setLoading(true);
      setError("");
      setPreview(null);

      try {
        const API_BASE_URL =
          import.meta.env.VITE_API_URL || "http://localhost:3000";

        const response = await fetch(`${API_BASE_URL}/api/globalpath/preview`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters),
          signal: controller.signal,
        });

        const result = (await response.json()) as GlobalPathApiResponse;

        if (!response.ok || !result.success || !result.data) {
          throw new Error(
            result.message || "Failed to generate GlobalPath preview",
          );
        }

        setPreview(result.data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while generating your preview.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchGlobalPathPreview();

    return () => controller.abort();
  }, [isOpen, filters]);

  if (!isOpen) return null;

  const isLight = theme === "light";
  const destinationDisplay = filters.destination;

  const formatNumberedPoints = (value: string) => {
    return value.replace(/(\s+)(\d+\.)\s+/g, "\n$2 ");
  };

  const cardText = (value: string | undefined, fallback: string) => {
    if (loading) return "Generating personalized guidance...";
    if (error) return "AI guidance is currently unavailable.";

    return formatNumberedPoints(value || fallback);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#00303F]/80 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="globalpath-modal-title"
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
          aria-label="Close modal"
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
            suitability, tuition pathways, cost planning guidance, and admission
            benchmarks across destination universities.
          </p>
          {error && (
            <p className="text-xs text-red-500 mb-3" role="alert">
              {error} Close and reopen the preview to try again.
            </p>
          )}
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
            <p className="text-[#7A9D96] mt-1 whitespace-pre-line">
              {cardText(
                preview?.searchProfile,
                `Budget: ${filters.budget} · Destination: ${destinationDisplay}`,
              )}
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
            <p className="leading-relaxed text-[#7A9D96] whitespace-pre-line">
              {cardText(
                preview?.academicFit,
                `Your selected education level is ${filters.education}, and your preferred field is ${filters.field}. Admission requirements depend on your qualifications and chosen university.`,
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
            <p className="leading-relaxed text-[#7A9D96] whitespace-pre-line">
              {cardText(
                preview?.trueCostPlanner,
                `Your selected annual budget is ${filters.budget}. Compare tuition, accommodation, living expenses, insurance, and other costs in ${filters.destination}.`,
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
            <p className="leading-relaxed text-[#7A9D96] whitespace-pre-line">
              {cardText(
                preview?.intakeDeadline,
                `Explore upcoming admission intakes for ${filters.field} programmes in ${filters.destination}. Verify deadlines with individual universities.`,
              )}
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
            <p className="leading-relaxed text-[#7A9D96] whitespace-pre-line">
              {cardText(
                preview?.scholarshipDiscovery,
                `Explore scholarship opportunities for ${filters.field} programmes in ${filters.destination}. Verify eligibility and funding with official providers.`,
              )}
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
            <p className="leading-relaxed text-[#7A9D96] whitespace-pre-line">
              {cardText(
                preview?.nextSteps,
                `Compare universities, review admission requirements, check your budget, and prepare application documents for ${filters.destination}.`,
              )}
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
