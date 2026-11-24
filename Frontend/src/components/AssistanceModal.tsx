import React from "react";
import { X } from "lucide-react";
import type { ThemeMode } from "../types";

interface AssistanceModalProps {
  title: string;
  description: string;
  theme: ThemeMode;
  onClose: () => void;
  children: React.ReactNode;
}

export const AssistanceModal: React.FC<AssistanceModalProps> = ({
  title,
  description,
  theme,
  onClose,
  children,
}) => {
  const isLight = theme === "light";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-[#00303F]/80 backdrop-blur-sm animate-in fade-in duration-200 font-sans"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl relative border max-h-[92vh] overflow-y-auto ${
          isLight
            ? "bg-white border-[#CAE4DB] text-[#00303F]"
            : "bg-[#002632] border-[#7A9D96]/40 text-[#CAE4DB]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#7A9D96] hover:text-[#DCAE1D] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="pr-8 mb-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[#DCAE1D] font-bold text-lg">✦</span>
            <h2
              id="modal-title"
              className={`text-lg sm:text-xl font-bold tracking-tight ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              {title}
            </h2>
          </div>

          <p className="text-xs text-[#7A9D96] leading-relaxed">
            {description}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
};
