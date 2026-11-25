import React, { useEffect, useRef, useState } from "react";
import { DESTINATION_CARDS } from "../data/mockData";
import type { DestinationCardData, ThemeMode } from "../types";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ExploreDestinationsProps {
  theme: ThemeMode;
  onSelectDestination: (countryName: string) => void;
}

export const ExploreDestinations: React.FC<ExploreDestinationsProps> = ({
  theme,
  onSelectDestination,
}) => {
  const [selectedModalCountry, setSelectedModalCountry] =
    useState<DestinationCardData | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isLight = theme === "light";

  // Duplicate cards so the 5-card viewport flows continuously in a seamless loop
  const loopedDestinations = [...DESTINATION_CARDS, ...DESTINATION_CARDS];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrameId: number;
    const speed = 0.5;

    const step = () => {
      if (!isPaused && !selectedModalCountry && track) {
        track.scrollLeft += speed;

        const halfWidth = track.scrollWidth / 2;
        if (track.scrollLeft >= halfWidth) {
          track.scrollLeft -= halfWidth;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, selectedModalCountry]);

  const handleManualSlide = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const cardStep = track.clientWidth / 5;
    const halfWidth = track.scrollWidth / 2;

    if (direction === "left" && track.scrollLeft <= cardStep) {
      track.scrollLeft += halfWidth;
    }

    track.scrollBy({
      left: direction === "right" ? cardStep : -cardStep,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="destinations"
      className={`w-full py-16 sm:py-20 transition-colors duration-200 font-sans ${
        isLight ? "bg-white" : "bg-[#001f29]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7A9D96] mb-2">
            EXPLORE DESTINATIONS
          </p>
          <h2
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${
              isLight ? "text-[#00303F]" : "text-[#CAE4DB]"
            }`}
          >
            One world. Many possibilities.
          </h2>
          <p className="text-xs sm:text-sm text-[#7A9D96] leading-relaxed font-normal">
            Discover study destinations by academic pathways, lifestyle,
            language and budget. Country information in the live product will
            link to official sources.
          </p>
        </div>

        {/* Framed 5-Card Carousel Container (Clean Rounded Clipping, No White Fade) */}
        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Left Arrow */}
          <button
            type="button"
            aria-label="Scroll destinations left"
            onClick={() => handleManualSlide("left")}
            className={`hidden lg:flex items-center justify-center absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full shadow-lg border transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 cursor-pointer ${
              isLight
                ? "bg-white border-[#CAE4DB] text-[#00303F] hover:bg-[#DCAE1D]"
                : "bg-[#002632] border-[#7A9D96]/40 text-[#CAE4DB] hover:bg-[#DCAE1D] hover:text-[#00303F]"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Rounded Outer Frame with Inner Padding so Cards Slide Behind Smooth Rounded Corners */}
          <div
            className={`rounded-3xl p-2.5 sm:p-3 border transition-colors ${
              isLight
                ? "bg-[#CAE4DB]/15 border-[#CAE4DB]"
                : "bg-[#002632]/70 border-[#7A9D96]/25"
            }`}
          >
            <div className="overflow-hidden rounded-2xl">
              <div
                ref={trackRef}
                className="flex gap-4 overflow-x-auto py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {loopedDestinations.map((dest, index) => (
                  <div
                    key={`${dest.id}-${index}`}
                    onClick={() => setSelectedModalCountry(dest)}
                    className={`group relative shrink-0 w-full sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-4rem)/5)] h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border ${
                      isLight ? "border-[#CAE4DB]" : "border-[#7A9D96]/30"
                    }`}
                  >
                    {/* Background Image */}
                    <img
                      src={dest.image}
                      alt={dest.country}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Cerulean Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#00303F] via-[#00303F]/60 to-transparent"></div>

                    {/* Text overlay at bottom */}
                    <div className="absolute bottom-0 inset-x-0 p-4 text-[#CAE4DB]">
                      <h3 className="text-base font-bold tracking-tight mb-1 group-hover:text-[#DCAE1D] transition-colors">
                        {dest.country}
                      </h3>
                      <p className="text-[10px] text-[#CAE4DB]/90 font-medium leading-tight">
                        {dest.tags}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            aria-label="Scroll destinations right"
            onClick={() => handleManualSlide("right")}
            className={`hidden lg:flex items-center justify-center absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full shadow-lg border transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 cursor-pointer ${
              isLight
                ? "bg-white border-[#CAE4DB] text-[#00303F] hover:bg-[#DCAE1D]"
                : "bg-[#002632] border-[#7A9D96]/40 text-[#CAE4DB] hover:bg-[#DCAE1D] hover:text-[#00303F]"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Country Detail Modal */}
      {selectedModalCountry && (
        <div
          onClick={() => setSelectedModalCountry(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#00303F]/75 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            className={`rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border ${
              isLight
                ? "bg-white border-[#CAE4DB] text-[#00303F]"
                : "bg-[#002632] border-[#7A9D96]/40 text-[#CAE4DB]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedModalCountry(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#7A9D96] hover:text-[#DCAE1D] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <h3
                className={`text-xl font-bold ${isLight ? "text-[#00303F]" : "text-white"}`}
              >
                {selectedModalCountry.country} Study Guide
              </h3>
              <span className="text-[11px] font-mono bg-[#CAE4DB] text-[#00303F] font-bold px-2 py-0.5 rounded">
                Verified
              </span>
            </div>

            <p className="text-xs font-semibold text-[#DCAE1D] mb-4">
              {selectedModalCountry.tags}
            </p>

            <div className="space-y-3 text-xs mb-6">
              <div
                className={`p-3 rounded-lg border ${
                  isLight
                    ? "bg-[#CAE4DB]/20 border-[#CAE4DB] text-[#00303F]"
                    : "bg-[#001f29] border-[#7A9D96]/30 text-[#CAE4DB]"
                }`}
              >
                <p className="font-bold mb-1 text-[#DCAE1D]">Tuition & Costs</p>
                <p>{selectedModalCountry.tuitionOverview}</p>
              </div>

              <div
                className={`p-3 rounded-lg border ${
                  isLight
                    ? "bg-[#CAE4DB]/20 border-[#CAE4DB] text-[#00303F]"
                    : "bg-[#001f29] border-[#7A9D96]/30 text-[#CAE4DB]"
                }`}
              >
                <p className="font-bold mb-1 text-[#DCAE1D]">
                  Post-Study Visa & Work Rights
                </p>
                <p>{selectedModalCountry.visaHighlights}</p>
              </div>

              <div
                className={`p-3 rounded-lg border ${
                  isLight
                    ? "bg-[#CAE4DB]/20 border-[#CAE4DB] text-[#00303F]"
                    : "bg-[#001f29] border-[#7A9D96]/30 text-[#CAE4DB]"
                }`}
              >
                <p className="font-bold mb-1 text-[#DCAE1D]">
                  Top Benchmark Universities
                </p>
                <p>{selectedModalCountry.topUniversities.join(" · ")}</p>
              </div>
            </div>

            <div
              className={`pt-3 border-t ${isLight ? "border-[#CAE4DB]" : "border-[#7A9D96]/30"}`}
            >
              <button
                onClick={() => {
                  onSelectDestination(selectedModalCountry.country);
                  setSelectedModalCountry(null);
                }}
                className="w-full bg-[#DCAE1D] hover:opacity-90 text-[#00303F] font-bold py-2.5 px-4 rounded-lg text-xs transition-colors cursor-pointer"
              >
                Set as my target destination
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
