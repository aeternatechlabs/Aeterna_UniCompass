import React from "react";

const TICKER_ITEMS = [
  "SCHOLARSHIPS",
  "AI & DATA SCIENCE",
  "SUMMER SCHOOLS",
  "GLOBAL UNIVERSITIES",
  "MBBS & MEDICINE",
  "ENGINEERING",
  "SCHOLARSHIPS",
  "AI & DATA SCIENCE",
  "SUMMER SCHOOLS",
];
export const TickerMarquee: React.FC = () => {
  return (
    <div className="w-full bg-[#002733] border-y border-[#7A9D96]/30 py-3.5 overflow-hidden select-none relative z-20 font-sans">
      <div className="flex animate-marquee whitespace-nowrap">
        {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, index) => (
          <div
            key={index}
            className="flex items-center mx-5 text-[11px] font-bold tracking-[0.2em] text-[#CAE4DB] uppercase transition-colors hover:text-[#DCAE1D] cursor-default"
          >
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#DCAE1D] ml-8 inline-block"></span>
          </div>
        ))}
      </div>
    </div>
  );
};
