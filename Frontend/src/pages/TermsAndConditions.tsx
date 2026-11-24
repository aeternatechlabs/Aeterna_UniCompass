import React from "react";
import type { ThemeMode } from "../types";
import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Scale, Globe2, LifeBuoy } from "lucide-react";

interface TermsAndConditionsProps {
  theme: ThemeMode;
  onNavigateHome: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  theme,
  onNavigateHome,
}) => {
  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-8 transition-colors duration-200 font-sans ${
        isLight ? "bg-[#f8faf9] text-[#00303F]" : "bg-[#001c26] text-[#CAE4DB]"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Back navigation */}
        <button
          onClick={onNavigateHome}
          className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border mb-8 transition-colors cursor-pointer ${
            isLight
              ? "border-[#CAE4DB] bg-white text-[#00303F] hover:border-[#DCAE1D] hover:text-[#DCAE1D]"
              : "border-[#7A9D96]/40 bg-[#002632] text-[#CAE4DB] hover:border-[#DCAE1D] hover:text-[#DCAE1D]"
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Page Header */}
        <div className="border-b pb-8 mb-10 border-[#7A9D96]/30">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00303F] text-[#DCAE1D] text-[11px] font-bold tracking-wider uppercase mb-4">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Documentation</span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-serif ${
              isLight ? "text-[#00303F]" : "text-white"
            }`}
          >
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#7A9D96]">
            Effective Date: November 24, 2026 &nbsp;|&nbsp; Version 1.0 &nbsp;|&nbsp; Platform: Aeterna UniCompass
          </p>
        </div>

        {/* Owner Confirmation Notice */}
        <div
          className={`p-4 rounded-xl border mb-10 text-xs leading-relaxed ${
            isLight
              ? "bg-[#CAE4DB]/20 border-[#7A9D96]/40 text-[#00303F]"
              : "bg-[#002632] border-[#7A9D96]/30 text-[#CAE4DB]"
          }`}
        >
          <p className="font-semibold text-[#DCAE1D] mb-1">
            Governing Law &amp; Legal Entity Jurisdiction:
          </p>
          <p>
            Governing jurisdiction (State/National Court) and corporate registration identification are marked as <strong>[Requires Owner Confirmation]</strong> and will be formalized prior to commercial enterprise deployment.
          </p>
        </div>

        {/* Main Terms Sections */}
        <div className="space-y-10 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2
              className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#DCAE1D]" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing the <strong>Aeterna UniCompass</strong> website, interactive tools, AI smart matching features, counseling request forms, or advisor scheduling systems, you agree to be bound by these Terms &amp; Conditions and our Privacy Policy. If you do not agree with any provision of these terms, please discontinue using the service immediately.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2
              className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#DCAE1D]" />
              2. Eligibility &amp; User Representations
            </h2>
            <p>
              The platform is intended for prospective students, parents, guardians, and academic counselors seeking information regarding global higher education opportunities. By submitting an advisory or counseling request:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#7A9D96]">
              <li>You confirm that you are at least 16 years of age or possess the consent of a parent or legal guardian.</li>
              <li>You agree to supply accurate, truthful, and up-to-date academic qualifications and contact information.</li>
              <li>You represent that you will not use automated scripts, scrapers, or bot mechanisms to burden our infrastructure.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2
              className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-[#DCAE1D]" />
              3. AI-Generated Guidance &amp; Institutional Disclaimers
            </h2>
            <div
              className={`p-4 rounded-xl border ${
                isLight
                  ? "bg-amber-50 border-amber-200 text-amber-900"
                  : "bg-amber-950/30 border-amber-800/40 text-amber-200"
              }`}
            >
              <p className="font-semibold mb-1 text-xs sm:text-sm">
                Important Disclaimer Regarding AI Recommendations &amp; Admissions:
              </p>
              <p className="text-xs leading-relaxed">
                Aeterna UniCompass utilizes artificial intelligence models to assist students in exploring academic pathways and institutional matches. AI outputs, compatibility scores, and admission forecasts are generated for informational discovery purposes only. They do not constitute formal university admission offers, scholarship commitments, or visa guarantees. Official admission criteria, English language prerequisites, and tuition rates are determined exclusively by the respective universities and national immigration authorities.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2
              className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              <Scale className="w-4 h-4 text-[#DCAE1D]" />
              4. Tuition, Living Costs &amp; Currency Estimates
            </h2>
            <p>
              The cost comparison tools and pathway estimations provided on Aeterna UniCompass reflect institutional sample datasets, historical benchmarks, and live currency rates from the Frankfurter API:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#7A9D96]">
              <li>Tuition fees and living expenses fluctuate based on academic year, city of study, currency volatility, and personal lifestyle choices.</li>
              <li>Always verify official tuition schedules directly with the admissions office of your target university before making financial or loan commitments.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2
              className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              <Globe2 className="w-4 h-4 text-[#DCAE1D]" />
              5. Intellectual Property
            </h2>
            <p>
              All proprietary algorithms, platform designs, UI components, branding assets, logos, and original written content associated with Aeterna UniCompass are the exclusive intellectual property of Aeterna Tech Labs and its licensors. Unauthorized reproduction, modification, decompilation, or redistribution is strictly prohibited without prior written permission.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2
              className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              <LifeBuoy className="w-4 h-4 text-[#DCAE1D]" />
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, Aeterna UniCompass, its directors, developers, and educational partners shall not be held liable for any indirect, incidental, punitive, or consequential damages arising from:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#7A9D96]">
              <li>Decisions made based on AI-generated advice or institutional estimates.</li>
              <li>Rejections, visa delays, or alterations in university admission criteria.</li>
              <li>Temporary technical downtime, network disruptions, or third-party API outages.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 border-t pt-8 border-[#7A9D96]/30">
            <h2
              className={`text-lg font-bold ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              7. Governing Law &amp; Inquiries
            </h2>
            <div
              className={`p-5 rounded-xl border text-xs sm:text-sm ${
                isLight
                  ? "bg-white border-[#CAE4DB]"
                  : "bg-[#002632] border-[#7A9D96]/30 text-[#CAE4DB]"
              }`}
            >
              <p>
                <strong>Governing Jurisdiction:</strong> [Requires Owner Confirmation / Designated Legal Court]
              </p>
              <p className="mt-1">
                <strong>Platform Operator:</strong> Aeterna UniCompass [Aeterna Tech Labs]
              </p>
              <p className="mt-1">
                <strong>Legal &amp; Advisory Inquiries:</strong> legal@aeternaunicompass.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
