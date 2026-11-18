import React, { useState } from "react";
import type { ThemeMode } from "../types";
import { AssistanceModal } from "../components/AssistanceModal";
import {
  submitCounsellingRequest,
  type CounsellingData,
} from "../services/supportService";

interface RequestCounsellingModalProps {
  theme: ThemeMode;
  onClose: () => void;
}

const initialForm: CounsellingData = {
  fullName: "",
  email: "",
  phone: "",
  preferredDestination: "",
  courseInterest: "",
  message: "",
};

const RequestCounsellingModal: React.FC<
  RequestCounsellingModalProps
> = ({ theme, onClose }) => {
  const [form, setForm] = useState<CounsellingData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const isLight = theme === "light";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const result = await submitCounsellingRequest(form);
      setSuccess(result.message || "Your counselling request was submitted!");
      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to submit your request.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full rounded-lg border p-3 text-sm outline-none focus:border-[#DCAE1D] ${
    isLight
      ? "border-[#CAE4DB] bg-white text-[#00303F]"
      : "border-[#7A9D96]/40 bg-[#001f29] text-[#CAE4DB]"
  }`;

  const labelClass = `block mb-2 text-sm font-medium ${
    isLight ? "text-[#00303F]" : "text-[#CAE4DB]"
  }`;

  return (
    <AssistanceModal
      title="Request Counselling"
      description="Tell us about your study goals. Our counselling team will contact you."
      theme={theme}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Preferred Destination</label>
          <select
            name="preferredDestination"
            value={form.preferredDestination}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select a country</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Course of Interest</label>
          <input
            name="courseInterest"
            value={form.courseInterest}
            onChange={handleChange}
            required
            placeholder="e.g. Computer Science, MBA"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us about your study plans..."
            className={inputClass}
          />
        </div>

        {success && (
          <p className="text-sm text-green-600" role="status">
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
          className="w-full rounded-lg bg-[#DCAE1D] text-[#00303F] font-bold py-3 text-sm hover:opacity-90 disabled:opacity-60 transition-all"
        >
          {loading ? "Submitting..." : "Submit Counselling Request"}
        </button>
      </form>
    </AssistanceModal>
  );
};

export default RequestCounsellingModal;