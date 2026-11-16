import React, { useState } from "react";
import type { Currency, ThemeMode } from "../types";
import { COUNTRY_COMPARISONS } from "../data/mockData";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CostComparisonProps {
  theme: ThemeMode;
}

export const CostComparison: React.FC<CostComparisonProps> = ({ theme }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("INR");
  const isLight = theme === "light";

  const currencies: { key: Currency; label: string }[] = [
    { key: "INR", label: "INR (₹)" },
    { key: "EUR", label: "EUR (€)" },
    { key: "GBP", label: "GBP (£)" },
    { key: "AUD", label: "AUD (A$)" },
    { key: "USD", label: "USD ($)" },
  ];

  return (
    <section
      id="compare-costs"
      className={`w-full py-16 sm:py-20 transition-colors duration-200 border-t font-sans ${
        isLight
          ? "bg-[#CAE4DB]/20 border-[#CAE4DB]"
          : "bg-[#002632] border-[#7A9D96]/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#7A9D96] mb-2">
            PLAN WITH CLARITY
          </p>
          <h2
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 ${
              isLight ? "text-[#00303F]" : "text-[#CAE4DB]"
            }`}
          >
            Compare the complete study picture.
          </h2>
          <p className="text-xs sm:text-sm text-[#7A9D96] leading-relaxed font-normal">
            Illustrative comparison layout. Production figures must come from
            official university and government sources, with the date of
            verification.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs">
          <span className="text-[#7A9D96] font-semibold mr-1">Display in:</span>
          {currencies.map(({ key, label }) => {
            const isActive = selectedCurrency === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedCurrency(key)}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00303F] text-[#DCAE1D] shadow-sm"
                    : isLight
                      ? "bg-white border border-[#CAE4DB] text-[#00303F] hover:border-[#DCAE1D]"
                      : "bg-[#001f29] border border-[#7A9D96]/40 text-[#CAE4DB] hover:border-[#DCAE1D]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* 3 Country Cost Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COUNTRY_COMPARISONS.map((item, index) => (
            <motion.div
              key={item.country}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }} // Staggered cascade effect
              whileHover={{ y: -6, scale: 1.01 }} // Smooth lift on hover
              className={`rounded-2xl p-6 border shadow-sm hover:shadow-xl  transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                isLight
                  ? "bg-white border-[#CAE4DB]"
                  : "bg-[#001f29] border-[#7A9D96]/30"
              }`}
            >
              {/* Subtle top accent highlight bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent  to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                {/* Flag + Country Name */}
                <div
                  className={`flex items-center gap-2.5 pb-4 mb-4 border-b ${
                    isLight ? "border-[#CAE4DB]" : "border-[#7A9D96]/20"
                  }`}
                >
                  <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                    {item.flag}
                  </span>
                  <h3
                    className={`text-lg font-bold group-hover:text-[#DCAE1D] transition-colors ${
                      isLight ? "text-[#00303F]" : "text-white"
                    }`}
                  >
                    {item.country}
                  </h3>
                </div>

                {/* Fields */}
                <div className="space-y-4 text-xs">
                  {/* Tuition Model */}
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-[#7A9D96] font-medium">
                      Tuition model
                    </span>
                    <span
                      className={`font-bold text-right ${
                        isLight ? "text-[#00303F]" : "text-[#CAE4DB]"
                      }`}
                    >
                      {item.tuitionModel[selectedCurrency]}
                    </span>
                  </div>

                  {/* Language */}
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-[#7A9D96] font-medium">Language</span>
                    <span
                      className={`font-semibold ${
                        isLight ? "text-[#00303F]" : "text-[#CAE4DB]"
                      }`}
                    >
                      {item.language}
                    </span>
                  </div>

                  {/* Typical Planning Items */}
                  <div
                    className={`pt-3 border-t ${
                      isLight ? "border-[#CAE4DB]" : "border-[#7A9D96]/20"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <span className="text-[#7A9D96] font-medium">
                        Typical planning items
                      </span>
                      <span className="text-[10px] text-[#7A9D96] font-medium">
                        {item.planningLabels}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-sm text-[#DCAE1D]">
                        {item.typicalPlanning[selectedCurrency]}
                      </span>
                    </div>
                  </div>

                  {/* Intake */}
                  <div
                    className={`flex justify-between items-baseline gap-2 pt-3 border-t ${
                      isLight ? "border-[#CAE4DB]" : "border-[#7A9D96]/20"
                    }`}
                  >
                    <span className="text-[#7A9D96] font-medium">Intake</span>
                    <span className="font-semibold text-[#DCAE1D]">
                      {item.intake}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Verification Badge */}
              <div
                className={`mt-6 pt-4 border-t flex items-center gap-1.5 text-[11px] font-semibold text-[#7A9D96] ${
                  isLight ? "border-[#CAE4DB]" : "border-[#7A9D96]/20"
                }`}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-[#CAE4DB] flex items-center justify-center text-[#00303F] shrink-0 font-bold group-hover:bg-[#DCAE1D] transition-colors">
                  <Check className="w-2.5 h-2.5 stroke-3" />
                </div>
                <span>{item.verificationNotice}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
