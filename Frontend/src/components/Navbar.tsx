import { useState } from "react";
import { Moon, Sun, ArrowRight, Menu, X } from "lucide-react";
export type ThemeMode = "light" | "dark";

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenSmartMatch: () => void;
  onScrollToSection: (sectionId: string) => void;
  onOpenGlobalPath: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenSmartMatch,
  onScrollToSection,
  onOpenGlobalPath,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLight = theme === "light";

  return (
    <header className="sticky top-0 z-40 w-full font-sans">
      {/* Top micro bar  */}
      <div className="bg-[#00303F] text-[#CAE4DB] text-xs py-1.5 px-4 sm:px-8 border-b border-[#7A9D96]/30 flex flex-wrap items-center justify-between tracking-wide">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wider text-[#CAE4DB]">
            AETERNA
          </span>
          <span className="text-[#7A9D96]">|</span>
          <span className="text-[#DCAE1D] font-medium">
            Opportunities worldwide
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[#CAE4DB] text-[11px]">
          <span
            className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
            onClick={() => onScrollToSection("destinations")}
          >
            First discovery
          </span>
          <span className="text-[#7A9D96]">·</span>
          <span
            className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
            onClick={onOpenSmartMatch}
          >
            Personalised matching
          </span>
          <span className="text-[#7A9D96]">·</span>
          <span
            className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
            onClick={() => onScrollToSection("compare-costs")}
          >
            Verifiable approach
          </span>
        </div>
      </div>

      {/* Main navigation */}
      <nav
        className={`${
          isLight
            ? "bg-white text-[#00303F] border-b border-[#CAE4DB]"
            : "bg-[#002632] text-[#CAE4DB] border-b border-[#7A9D96]/30"
        } backdrop-blur-md px-4 sm:px-8 py-3 transition-colors duration-200`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-13 h-13 rounded-full bg-[#00303F] border border-[#DCAE1D] flex items-center justify-center text-[#DCAE1D] shadow-sm group-hover:rotate-45 transition-transform duration-300">
              <img
                src="/src/assets/Logo.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-lg font-bold tracking-wider font-serif leading-none ${
                  isLight ? "text-[#00303F]" : "text-white"
                } group-hover:text-[#DCAE1D] transition-colors`}
              >
                AETERNA
              </span>
              <span className="text-[10px] text-[#7A9D96] font-medium mt-0.5 tracking-tight">
                Your Global Education Journey Starts Here
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div
            className={`hidden md:flex items-center gap-7 text-xs font-semibold ${
              isLight ? "text-[#00303F]" : "text-[#CAE4DB]"
            }`}
          >
            <button
              onClick={() => onScrollToSection("destinations")}
              className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
            >
              Countries
            </button>
            <button
              onClick={() => onScrollToSection("pathways")}
              className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
            >
              Courses
            </button>
            <button
              onClick={onOpenSmartMatch}
              className="hover:text-[#DCAE1D] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#DCAE1D]"></span>
              AI Smart Match
            </button>
            <button
              onClick={() => onScrollToSection("compare-costs")}
              className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
            >
              Compare Costs
            </button>
            <button
              onClick={() => onScrollToSection("summer-schools")}
              className="hover:text-[#DCAE1D] transition-colors cursor-pointer"
            >
              Summer Schools
            </button>
          </div>

          {/* Right Actions: Theme Switcher & Find My Course Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isLight
                  ? "border-[#7A9D96]/40 text-[#00303F] hover:bg-[#CAE4DB]/40 hover:text-[#DCAE1D]"
                  : "border-[#7A9D96]/50 text-[#CAE4DB] hover:bg-[#00303F] hover:text-[#DCAE1D]"
              }`}
              title={isLight ? "Switch to Dark Theme" : "Switch to Light Theme"}
            >
              {isLight ? (
                <Moon className="w-4 h-4 text-[#00303F] hover:text-[#DCAE1D] transition-colors" />
              ) : (
                <Sun className="w-4 h-4 text-[#DCAE1D] hover:rotate-45 transition-transform" />
              )}
            </button>

            {/* Find My Course Button in Honey (#DCAE1D) with Cerulean (#00303F) text */}
            <button
              onClick={onOpenGlobalPath}
              className="bg-[#DCAE1D] hover:opacity-90 active:scale-95 text-[#00303F] font-bold px-5 py-2 rounded-full text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span>Find My Course</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile hamburger & theme toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleTheme}
              className={`p-1.5 rounded-full border ${
                isLight
                  ? "border-[#7A9D96]/50 text-[#00303F]"
                  : "border-[#7A9D96]/50 text-[#DCAE1D]"
              }`}
            >
              {isLight ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 ${isLight ? "text-[#00303F]" : "text-[#CAE4DB]"}`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden mt-3 pt-3 border-t ${
              isLight ? "border-[#CAE4DB]" : "border-[#7A9D96]/30"
            } flex flex-col gap-2.5 pb-2 text-xs font-semibold`}
          >
            <button
              onClick={() => {
                onScrollToSection("destinations");
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#DCAE1D]"
            >
              Countries
            </button>
            <button
              onClick={() => {
                onScrollToSection("pathways");
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#DCAE1D]"
            >
              Courses
            </button>
            <button
              onClick={() => {
                onOpenSmartMatch();
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-[#DCAE1D] flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#DCAE1D]"></span>
              AI Smart Match
            </button>
            <button
              onClick={() => {
                onScrollToSection("compare-costs");
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#DCAE1D]"
            >
              Compare Costs
            </button>
            <button
              onClick={() => {
                onScrollToSection("summer-schools");
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#DCAE1D]"
            >
              Summer Schools
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  onOpenGlobalPath();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#DCAE1D] text-[#00303F] font-bold py-2.5 rounded-full text-center"
              >
                Find My Course
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
