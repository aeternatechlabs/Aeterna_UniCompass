import React, { useState } from "react";
import type { ThemeMode } from "../types";
import { AssistanceModal } from "../components/AssistanceModal";
import {
  submitSupportRequest,
  type SupportData,
} from "../services/supportService";

interface StudentSupportModalProps {
  theme: ThemeMode;
  onClose: () => void;
}

const initialForm: SupportData = {
  fullName: "",
  email: "",
  category: "",
  subject: "",
  message: "",
};

const faqs = [
  {
    question: "How can I find the right university?",
    answer:
      "Explore countries and courses on Aeterna or request personalized counselling.",
  },
  {
    question: "Can I compare study costs?",
    answer:
      "Yes. Use the Compare Costs feature to explore estimated study expenses.",
  },
  {
    question: "Can I get help with my application?",
    answer: "Yes. Submit a support request or book a meeting with an advisor.",
  },
  {
    question: "How can I contact a counsellor?",
    answer: "Use the Request Counselling or Speak with an Advisor options.",
  },
];

const StudentSupportModal: React.FC<StudentSupportModalProps> = ({
  theme,
  onClose,
}) => {
  const isLight = theme === "light";

  const [form, setForm] = useState<SupportData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const inputClass = `w-full rounded-lg border p-3 outline-none transition-colors ${
    isLight
      ? "border-[#CAE4DB] bg-white text-[#00303F] placeholder:text-slate-400 focus:border-[#DCAE1D]"
      : "border-[#7A9D96]/40 bg-[#001c26] text-white placeholder:text-slate-500 focus:border-[#DCAE1D]"
  }`;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const result = await submitSupportRequest(form);
      setSuccess(result.message || "Your support request was submitted!");
      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to submit your request.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AssistanceModal
      title="Student Support"
      description="We're here to help you throughout your study-abroad journey."
      theme={theme}
      onClose={onClose}
    >
      <div className="space-y-7">
        {/* Frequently Asked Questions */}
        <section>
          <h3
            className={`text-base font-bold mb-4 ${
              isLight ? "text-[#00303F]" : "text-white"
            }`}
          >
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className={`rounded-xl p-4 border ${
                  isLight
                    ? "bg-[#f8faf9] border-[#CAE4DB]"
                    : "bg-[#001c26] border-[#7A9D96]/30"
                }`}
              >
                <summary
                  className={`cursor-pointer font-semibold text-sm ${
                    isLight ? "text-[#00303F]" : "text-white"
                  }`}
                >
                  {faq.question}
                </summary>

                <p className="mt-3 text-sm text-[#7A9D96] leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact Support Form */}
        <section>
          <div className="mb-5">
            <h3
              className={`text-base font-bold ${
                isLight ? "text-[#00303F]" : "text-white"
              }`}
            >
              Contact Student Support
            </h3>

            <p className="text-xs text-[#7A9D96] mt-1">
              Describe your issue and our team will get back to you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="fullName"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
              placeholder="Full Name"
              className={inputClass}
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="Email Address"
              className={inputClass}
            />

            <select
              name="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className={inputClass}
            >
              <option value="">Select support category</option>
              <option value="Course Guidance">Course Guidance</option>
              <option value="University Application">
                University Application
              </option>
              <option value="Documents">Documents</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Other">Other</option>
            </select>

            <input
              name="subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
              placeholder="Subject"
              className={inputClass}
            />

            <textarea
              name="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={4}
              placeholder="Describe your issue..."
              className={`${inputClass} resize-y`}
            />

            {success && (
              <p className="text-sm text-green-500" role="status">
                {success}
              </p>
            )}

            {error && (
              <p className="text-sm text-red-500" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#DCAE1D] text-[#00303F] font-bold py-3 hover:bg-[#e8bd38] transition-colors disabled:opacity-60"
            >
              {loading ? "Sending..." : "Submit Support Request"}
            </button>
          </form>
        </section>
      </div>
    </AssistanceModal>
  );
};
export default StudentSupportModal;
