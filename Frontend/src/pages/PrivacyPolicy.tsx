import React from "react";
import type { ThemeMode } from "../types";
import { ArrowLeft, Shield, Lock, Cpu, Mail, Globe, Database, UserCheck } from "lucide-react";

interface PrivacyPolicyProps {
  theme: ThemeMode;
  onNavigateHome: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
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
            <Shield className="w-3.5 h-3.5" />
            <span>Legal Documentation</span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight font-serif ${
              isLight ? "text-[#00303F]" : "text-white"
            }`}
          >
            Privacy Policy
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#7A9D96]">
            Effective Date: November 24, 2026 &nbsp;|&nbsp; Version 1.0 &nbsp;|&nbsp; Platform: Aeterna UniCompass
          </p>
        </div>

        {/* Notice for Owner Confirmation */}
        <div
          className={`p-4 rounded-xl border mb-10 text-xs leading-relaxed ${
            isLight
              ? "bg-[#CAE4DB]/20 border-[#7A9D96]/40 text-[#00303F]"
              : "bg-[#002632] border-[#7A9D96]/30 text-[#CAE4DB]"
          }`}
        >
          <p className="font-semibold text-[#DCAE1D] mb-1">
            Note on Corporate &amp; Legal Identity:
          </p>
          <p>
            Official legal entity registration name, jurisdiction headquarters address, and designated Data Protection Officer (DPO) contact are marked as <strong>[Requires Owner Confirmation]</strong> and will be formalized prior to commercial enterprise deployment.
          </p>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-10 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2
              className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              <UserCheck className="w-4 h-4 text-[#DCAE1D]" />
              1. Information We Collect
            </h2>
            <p>
              Aeterna UniCompass collects student information solely to facilitate international education discovery, university compatibility assessments, advisor meetings, and counseling support:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#7A9D96]">
              <li>
                <strong>Student Contact Information:</strong> Full name, email address, telephone/WhatsApp number, and preferred study advisory location (e.g., Mysuru, Belagavi, Bengaluru).
              </li>
              <li>
                <strong>Academic &amp; Study Abroad Preferences:</strong> Educational qualification stage (Undergraduate, Graduate, High School), target study destinations (e.g., UK, USA, Canada, Australia, Germany, Ireland), field of study interest, and estimated budget ranges.
              </li>
              <li>
                <strong>Advisory Scheduling Details:</strong> Preferred meeting date, time slot, duration (30 or 60 minutes), and specific guidance consultation objectives.
              </li>
              <li>
                <strong>Interactive Queries:</strong> Inquiries submitted through the AI Chat Advisor Widget, GlobalPath Explorer, and Cost Comparison tool.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2
              className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              <Cpu className="w-4 h-4 text-[#DCAE1D]" />
              2. AI Processing &amp; Artificial Intelligence Disclosure
            </h2>
            <p>
              Aeterna UniCompass integrates artificial intelligence technologies to provide rapid compatibility evaluations, conversational study-abroad guidance, and customized university previews:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#7A9D96]">
              <li>
                <strong>Third-Party AI Inference Provider:</strong> Profile evaluation inputs and chat messages are processed via the <strong>Groq Cloud API</strong> (using high-speed inference models such as <code>openai/gpt-oss-120b</code>).
              </li>
              <li>
                <strong>No Automated Harmful Profiling:</strong> AI recommendations are purely directional and informational. They do not constitute official admission decisions, visa guarantees, or financial commitments.
              </li>
              <li>
                <strong>Confidentiality in AI Processing:</strong> We do not submit student passwords or unneeded personally identifiable data to public training sets.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2
              className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              <Mail className="w-4 h-4 text-[#DCAE1D]" />
              3. Communications &amp; Third-Party Service Providers
            </h2>
            <p>
              To deliver transactional confirmations and connect prospective students with academic advisors, we share necessary submission data with verified service partners:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#7A9D96]">
              <li>
                <strong>Transactional Email Delivery:</strong> Meeting confirmation emails and counselor notifications are routed through <strong>Resend</strong> (Resend, Inc.). Your submitted name, email, and meeting parameters are transmitted to deliver notifications securely.
              </li>
              <li>
                <strong>Currency Exchange Data:</strong> Currency conversion data is retrieved dynamically via the <strong>Frankfurter API</strong>. No personal data is transmitted in currency conversion requests.
              </li>
              <li>
                <strong>Database &amp; Cloud Infrastructure:</strong> Data is stored in secure cloud-hosted MongoDB databases equipped with connection-level authentication and network isolation.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2
              className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              <Lock className="w-4 h-4 text-[#DCAE1D]" />
              4. Cookies, Local Storage &amp; Analytics
            </h2>
            <p>
              Aeterna UniCompass employs minimal browser storage mechanisms:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#7A9D96]">
              <li>
                <strong>Essential Storage:</strong> Local storage is utilized to persist your visual theme preference (light/dark mode) and your cookie consent choices (<code>aeterna_cookie_consent</code>).
              </li>
              <li>
                <strong>Optional Analytics:</strong> If enabled by your consent choices, aggregated, privacy-preserving interaction counts (such as page views or pathway filters explored) may be recorded to enhance platform performance. No sensitive student files or private prompts are shared with marketing analytics.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2
              className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              <Database className="w-4 h-4 text-[#DCAE1D]" />
              5. Data Storage, Retention &amp; Security
            </h2>
            <p>
              We enforce technical, administrative, and physical safeguards designed to protect personal information against unauthorized disclosure, loss, or alteration:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#7A9D96]">
              <li>
                <strong>Transmission Security:</strong> All data transmitted between your browser and our servers is encrypted using modern TLS (HTTPS) protocols with strict HTTP security headers.
              </li>
              <li>
                <strong>Backend Isolation:</strong> API keys, database credentials, and email tokens remain strictly server-side and are never exposed in frontend bundles.
              </li>
              <li>
                <strong>Retention Period:</strong> Counseling and advisory inquiries are retained for the duration of the academic advisory cycle or until deletion is formally requested by the student.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2
              className={`text-lg font-bold flex items-center gap-2 ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              <Globe className="w-4 h-4 text-[#DCAE1D]" />
              6. Your Rights &amp; Data Deletion Requests
            </h2>
            <p>
              Regardless of your geographical location, Aeterna respects your privacy rights. You have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#7A9D96]">
              <li>Request a copy of the personal details stored about your advisory requests.</li>
              <li>Request correction or updating of any inaccurate contact information.</li>
              <li>Request the complete deletion of your meeting history or student records from our database.</li>
              <li>Withdraw consent for optional analytics or email follow-ups at any time.</li>
            </ul>
            <p className="text-xs sm:text-sm text-[#7A9D96]">
              To exercise any of these rights, please contact our privacy compliance team via email with the subject line <em>"Data Privacy Request"</em>.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 border-t pt-8 border-[#7A9D96]/30">
            <h2
              className={`text-lg font-bold ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              7. Contact &amp; Privacy Inquiries
            </h2>
            <div
              className={`p-5 rounded-xl border text-xs sm:text-sm ${
                isLight
                  ? "bg-white border-[#CAE4DB]"
                  : "bg-[#002632] border-[#7A9D96]/30 text-[#CAE4DB]"
              }`}
            >
              <p>
                <strong>Platform:</strong> Aeterna UniCompass
              </p>
              <p className="mt-1">
                <strong>Legal Operator:</strong> [Requires Owner Confirmation / Aeterna Tech Labs]
              </p>
              <p className="mt-1">
                <strong>Registered Address:</strong> [Requires Owner Confirmation / Institutional Address]
              </p>
              <p className="mt-1">
                <strong>Privacy &amp; Data Inquiry Email:</strong> privacy@aeternaunicompass.com (or designated administrator email)
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
