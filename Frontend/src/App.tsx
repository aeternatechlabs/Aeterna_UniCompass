import React, { useEffect, useState } from "react";
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

const App = () => {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [filters, setFilters] = useState<PathwayFilter>({
    education: "Graduate",
    field: "Healthcare / Nursing",
    budget: "₹8 - 12 Lakh",
    destination: "United Kingdom",
  });

  const [isGlobalPathModalOpen, setIsGlobalPathModalOpen] = useState(false);
  const [isSmartMatchModalOpen, setIsSmartMatchModalOpen] = useState(false);
   const [isAiChatOpen, setIsAiChatOpen] = useState(false);


  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  const handleFilterChange = (key: keyof PathwayFilter, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

  const handleLearnMoreShortProgrammes=(_type:string)=>{
    setIsAiChatOpen(true);
  }

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

      {/* main Content */}
      <main>
        {/* Hero Section */}
        <Hero
          theme={theme}
          onDiscoverClick={() => setIsGlobalPathModalOpen(true)}
          onSeeHowItWorksClick={() => handleScrollToSection("smart-match")}
        />

        {/* Infinite scrolling ticker */}
        <TickerMarquee />

        {/* Floating Pathway Finder Card */}
        <PathwayFinder
          theme={theme}
          filter={filters}
          onFilterChange={handleFilterChange}
          onExploreClick={() => setIsGlobalPathModalOpen(true)}
          onDetailedClick={() => setIsSmartMatchModalOpen(true)}
        />

        {/* Section 1: Explore Destinations */}
        <ExploreDestinations
          theme={theme}
          onSelectDestination={handleSelectDestination}
        />

        {/* Section 2: Popular Pathways */}
        <PopularPathways theme={theme} onSelectField={handleSelectField} />

        {/* Section 3: Smart Match Feature */}
        <SmartMatchSection
          theme={theme}
          onStartSmartMatch={() => setIsSmartMatchModalOpen(true)}
        />

        {/* Section 4: Cost Comparison */}
        <CostComparison theme={theme} />

        {/* Section 5: Short Programmes */}
        <ShortProgrammes
          theme={theme}
          onLearnMore={handleLearnMoreShortProgrammes}
        />
      </main>
    </div>
  );
};

export default App;
