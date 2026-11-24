import React from "react";
import type { ThemeMode } from "../types";
import { Compass, Home, Search, ArrowRight } from "lucide-react";

interface NotFoundProps {
  theme: ThemeMode;
  onNavigateHome: () => void;
  onOpenSmartMatch?: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({
  theme,
  onNavigateHome,
  onOpenSmartMatch,
}) => {
  const isLight = theme === "light";

  return (
    <div
      className={`min-h-[80vh] flex items-center justify-center py-20 px-4 sm:px-8 transition-colors duration-200 font-sans ${
        isLight ? "bg-[#f8faf9] text-[#00303F]" : "bg-[#001c26] text-[#CAE4DB]"
      }`}
    >
      <div className="max-w-md w-full text-center space-y-6">
        {/* Animated Icon Badge */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00303F] border-2 border-[#DCAE1D] text-[#DCAE1D] shadow-lg mb-2">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        {/* Status Code */}
        <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#DCAE1D]/20 text-[#DCAE1D] border border-[#DCAE1D]/40">
          Error 404 · Pathway Not Found
        </div>

        {/* Heading */}
        <h1
          className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-serif ${
            isLight ? "text-[#00303F]" : "text-white"
          }`}
        >
          Lost Your Direction?
        </h1>

        {/* Description */}
        <p className="text-sm text-[#7A9D96] leading-relaxed max-w-sm mx-auto">
          The educational pathway or page you are searching for does not exist or may have been relocated. Let us help guide you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#DCAE1D] text-[#00303F] font-bold px-6 py-3 rounded-full text-xs shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          {onOpenSmartMatch && (
            <button
              onClick={onOpenSmartMatch}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                isLight
                  ? "border-[#CAE4DB] bg-white text-[#00303F] hover:border-[#DCAE1D] hover:text-[#DCAE1D]"
                  : "border-[#7A9D96]/40 bg-[#002632] text-[#CAE4DB] hover:border-[#DCAE1D] hover:text-[#DCAE1D]"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Explore Pathways</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
