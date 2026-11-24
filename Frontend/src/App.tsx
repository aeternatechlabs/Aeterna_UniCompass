import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TickerMarquee } from "./components/TickerMarquee";
import { PathwayFinder } from "./components/PathwayFinder";
import type { PathwayFilter, ThemeMode } from "./types";
import { ExploreDestinations } from "./components/ExploreDestinations";
import { PopularPathways } from "./components/PopularPathways";
import { SmartMatchSection } from "./components/SmartMatchSection";
import { CostComparison } from "./components/CostComparison";
import { ShortProgrammes } from "./components/ShortProgrammes";
import { FourSteps } from "./components/FourSteps";
import { CtaBanner } from "./components/CtaBanner";
import { Footer } from "./components/Footer";
import { GlobalPathModal } from "./components/GlobalPathModal";
import { SmartMatchModal } from "./components/SmartMatchModel";
import { AiChatWidget } from "./components/AiChatWidget";
import { CookieConsent } from "./components/CookieConsent";

import RequestCounselling from "./pages/RequestCounselling";
import SpeakWithAdvisor from "./pages/SpeakWithAdvisor";
import StudentSupport from "./pages/StudentSupport";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import NotFound from "./pages/NotFound";

type AssistanceModalType = "counselling" | "advisor" | "support" | null;

const App = () => {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname || "/";
    }
    return "/";
  });

  const [filters, setFilters] = useState<PathwayFilter>({
    education: "Graduate",
    field: "Healthcare / Nursing",
    budget: "₹8 - 12 Lakh",
    destination: "United Kingdom",
  });

  const [isGlobalPathModalOpen, setIsGlobalPathModalOpen] = useState(false);
  const [isSmartMatchModalOpen, setIsSmartMatchModalOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);

  // Controls Student Assistance modals
  const [activeAssistanceModal, setActiveAssistanceModal] =
    useState<AssistanceModalType>(null);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  // Synchronize browser history and popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update document title dynamically based on route
    if (path === "/privacy-policy") {
      document.title = "Privacy Policy | Aeterna UniCompass";
    } else if (path === "/terms-and-conditions") {
      document.title = "Terms & Conditions | Aeterna UniCompass";
    } else if (path === "/" || path === "") {
      document.title =
        "Aeterna UniCompass | AI-Powered Global Education & University Pathway Discovery";
    } else {
      document.title = "Page Not Found | Aeterna UniCompass";
    }
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleFilterChange = (key: keyof PathwayFilter, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleScrollToSection = (sectionId: string) => {
    if (currentPath !== "/") {
      navigateTo("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleDiscussWithAeterna = () => {
    setIsAiChatOpen(true);
  };

  const handleSelectDestination = (countryName: string) => {
    setFilters((prev) => ({ ...prev, destination: countryName }));
    setIsGlobalPathModalOpen(true);
  };

  const handleSelectField = (fieldTitle: string) => {
    let mappedField = fieldTitle;

    if (fieldTitle.includes("Medicine")) mappedField = "Medicine & MBBS";
    else if (fieldTitle.includes("Engineering")) mappedField = "Engineering";
    else if (fieldTitle.includes("Computer"))
      mappedField = "Computer Science & AI";
    else if (fieldTitle.includes("Business"))
      mappedField = "Business & Management";

    setFilters((prev) => ({ ...prev, field: mappedField }));
    setIsGlobalPathModalOpen(true);
  };

  const handleLearnMoreShortProgrammes = () => {
    setIsAiChatOpen(true);
  };

  // Determine which page view to render
  const isHome = currentPath === "/" || currentPath === "";
  const isPrivacy = currentPath === "/privacy-policy";
  const isTerms = currentPath === "/terms-and-conditions";
  const is404 = !isHome && !isPrivacy && !isTerms;

  return (
    <div
      className={`min-h-screen font-sans antialiased selection:bg-[#DCAE1D] selection:text-[#00303F] transition-colors duration-200 ${
        theme === "light"
          ? "bg-[#f8faf9] text-[#00303F]"
          : "bg-[#001c26] text-[#CAE4DB]"
      }`}
    >
      {/* Navigation with Theme Switcher */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenSmartMatch={() => setIsSmartMatchModalOpen(true)}
        onScrollToSection={handleScrollToSection}
        onOpenGlobalPath={() => setIsGlobalPathModalOpen(true)}
      />

      {/* Main Content Router */}
      <main>
        {isHome && (
          <>
            <Hero
              theme={theme}
              onDiscoverClick={() => handleScrollToSection("pathways")}
              onSeeHowItWorksClick={() => handleScrollToSection("foursteps")}
            />

            <TickerMarquee />

            <PathwayFinder
              theme={theme}
              filter={filters}
              onFilterChange={handleFilterChange}
              onExploreClick={() => setIsGlobalPathModalOpen(true)}
              onDetailedClick={() => setIsSmartMatchModalOpen(true)}
            />

            <ExploreDestinations
              theme={theme}
              onSelectDestination={handleSelectDestination}
            />

            <PopularPathways theme={theme} onSelectField={handleSelectField} />

            <SmartMatchSection
              theme={theme}
              onStartSmartMatch={() => setIsSmartMatchModalOpen(true)}
            />

            <CostComparison theme={theme} />

            <ShortProgrammes
              theme={theme}
              onLearnMore={handleLearnMoreShortProgrammes}
            />

            <FourSteps theme={theme} />

            <CtaBanner
              theme={theme}
              onOpenAiGuide={() => setIsAiChatOpen(true)}
            />
          </>
        )}

        {isPrivacy && (
          <PrivacyPolicy theme={theme} onNavigateHome={() => navigateTo("/")} />
        )}

        {isTerms && (
          <TermsAndConditions
            theme={theme}
            onNavigateHome={() => navigateTo("/")}
          />
        )}

        {is404 && (
          <NotFound
            theme={theme}
            onNavigateHome={() => navigateTo("/")}
            onOpenSmartMatch={() => {
              navigateTo("/");
              setTimeout(() => setIsSmartMatchModalOpen(true), 150);
            }}
          />
        )}
      </main>

      {activeAssistanceModal === "counselling" && (
        <RequestCounselling
          theme={theme}
          onClose={() => setActiveAssistanceModal(null)}
        />
      )}

      {activeAssistanceModal === "advisor" && (
        <SpeakWithAdvisor
          theme={theme}
          onClose={() => setActiveAssistanceModal(null)}
        />
      )}

      {activeAssistanceModal === "support" && (
        <StudentSupport
          theme={theme}
          onClose={() => setActiveAssistanceModal(null)}
        />
      )}

      {/* Footer */}
      <Footer
        theme={theme}
        onOpenSmartMatch={() => setIsSmartMatchModalOpen(true)}
        onScrollToSection={handleScrollToSection}
        onOpenGlobalPath={() => setIsGlobalPathModalOpen(true)}
        onOpenAssistance={(modalType) => setActiveAssistanceModal(modalType)}
        onNavigate={navigateTo}
        onOpenCookiePreferences={() => setIsCookieModalOpen(true)}
      />

      {/* Existing Modals */}
      <GlobalPathModal
        isOpen={isGlobalPathModalOpen}
        onClose={() => setIsGlobalPathModalOpen(false)}
        theme={theme}
        filters={filters}
        onDiscussWithAeterna={handleDiscussWithAeterna}
      />

      <SmartMatchModal
        isOpen={isSmartMatchModalOpen}
        onClose={() => setIsSmartMatchModalOpen(false)}
        theme={theme}
        onDiscussWithAeterna={handleDiscussWithAeterna}
      />

      {/* Floating AI Assistant */}
      <AiChatWidget
        isOpen={isAiChatOpen}
        onToggle={() => setIsAiChatOpen(!isAiChatOpen)}
        theme={theme}
        currentFilters={filters}
      />

      {/* Cookie Consent Banner & Modal */}
      <CookieConsent
        theme={theme}
        onNavigatePolicy={() => navigateTo("/privacy-policy")}
        isOpenExplicitly={isCookieModalOpen}
        onCloseExplicitModal={() => setIsCookieModalOpen(false)}
      />
    </div>
  );
};

export default App;
