import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";
import type { ThemeMode } from "../types";

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  counsellingPath?: string;
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  theme,
  counsellingPath = "/counselling-request",
}) => {
  if (!isOpen) return null;

  const isLight = theme === "light";

  const getCounsellingFormUrl = () => {
    if (
      counsellingPath.startsWith("http://") ||
      counsellingPath.startsWith("https://")
    ) {
      return counsellingPath;
    }
    const base =
      import.meta.env.VITE_PUBLIC_APP_URL ||
      (typeof window !== "undefined" ? window.location.origin : "");
    const normalizedPath = counsellingPath.startsWith("/")
      ? counsellingPath
      : `/${counsellingPath}`;
    return `${base}${normalizedPath}`;
  };

  const counsellingFormUrl = getCounsellingFormUrl();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#00303F]/80 backdrop-blur-sm font-sans"
      onClick={onClose}
    >
      <div
        className={`rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative border ${
          isLight
            ? "bg-white border-[#CAE4DB] text-[#00303F]"
            : "bg-[#002632] border-[#7A9D96]/40 text-[#CAE4DB]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close QR modal"
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#7A9D96] hover:text-[#DCAE1D] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4 pr-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A9D96] mb-1">
            INSTANT MOBILE ACCESS
          </p>
          <h2
            className={`text-base sm:text-lg font-bold tracking-tight ${
              isLight ? "text-[#00303F]" : "text-white"
            }`}
          >
            Counselling Form QR
          </h2>
          <p className="text-xs text-[#7A9D96] mt-1">
            Scan this QR code with any mobile camera to open the counselling
            request form.
          </p>
        </div>

        <div
          className={`rounded-xl border p-5 flex flex-col items-center text-center space-y-3 ${
            isLight
              ? "bg-[#CAE4DB]/20 border-[#CAE4DB]"
              : "bg-[#001f29] border-[#7A9D96]/30"
          }`}
        >
          <div className="p-3 rounded-xl bg-white shadow-sm">
            <QRCodeSVG
              value={counsellingFormUrl}
              size={176}
              bgColor="#ffffff"
              fgColor="#00303F"
              level="M"
            />
          </div>
          <p className="text-xs font-bold">
            Scan with any mobile camera to open the counselling form
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#7A9D96]/20 flex items-center justify-between gap-2 text-xs">
          <span className="text-[11px] text-[#7A9D96]">
            Open form directly:
          </span>
          <a
            href={counsellingFormUrl}
            onClick={onClose}
            className="font-bold text-[#DCAE1D] hover:underline whitespace-nowrap"
          >
            Counselling request form →
          </a>
        </div>
      </div>
    </div>
  );
};
