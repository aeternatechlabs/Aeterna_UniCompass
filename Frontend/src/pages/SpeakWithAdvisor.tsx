import React, { useState } from "react";
import { Calendar, Clock, CheckCircle, Loader2 } from "lucide-react";

import type { ThemeMode } from "../types";
import type { MeetingRequestData } from "../types/meeting.types";

import { AssistanceModal } from "../components/AssistanceModal";
import { submitMeetingRequest } from "../services/meetingService";

interface SpeakWithAdvisorModalProps {
  theme: ThemeMode;
  onClose: () => void;
}

const timeSlots = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

const SpeakWithAdvisorModal: React.FC<SpeakWithAdvisorModalProps> = ({
  theme,
  onClose,
}) => {
  const isLight = theme === "light";

  const [duration, setDuration] = useState<30 | 60>(30);
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    purpose: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Set minimum date to tomorrow.
  // The backend currently treats the selected date as midnight,
  // so selecting tomorrow avoids its past-date validation issue.
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = [
    tomorrow.getFullYear(),
    String(tomorrow.getMonth() + 1).padStart(2, "0"),
    String(tomorrow.getDate()).padStart(2, "0"),
  ].join("-");

  const inputClass = `
    w-full rounded-lg border px-4 py-3 text-sm outline-none transition
    focus:border-[#DCAE1D] focus:ring-1 focus:ring-[#DCAE1D]
    ${
      isLight
        ? "bg-white border-[#CAE4DB] text-[#00303F] placeholder:text-gray-400"
        : "bg-[#00303F] border-[#7A9D96]/40 text-white placeholder:text-gray-400"
    }
  `;

  const labelClass = "block text-sm font-semibold mb-2";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!preferredDate || !preferredTime) {
      setError("Please select your preferred date and time.");
      return;
    }

    const meetingData: MeetingRequestData = {
      ...formData,
      preferredDate,
      preferredTime,
      duration,
    };

    try {
      setLoading(true);

      const result = await submitMeetingRequest(meetingData);

      setSuccess(true);
      setMessage(result.message);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AssistanceModal
      title="Speak with an Advisor"
      description="Schedule a personal consultation with our study-abroad advisor."
      theme={theme}
      onClose={onClose}
    >
      {success ? (
        <div className="py-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

          <h3
            className={`text-xl font-bold mb-2 ${
              isLight ? "text-[#00303F]" : "text-white"
            }`}
          >
            Request Submitted!
          </h3>

          <p className="text-sm text-[#7A9D96] leading-relaxed mb-5">
            {message}
          </p>

          <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 mb-6">
            <p className="text-sm text-amber-600 font-semibold">
              Awaiting Adviser Confirmation
            </p>

            <p className="text-xs text-[#7A9D96] mt-1">
              Your meeting is not confirmed yet. Our adviser will contact you
              after reviewing your preferred time.
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg bg-[#00303F] text-white font-semibold hover:bg-[#00485B] transition"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Meeting Duration */}
          <div>
            <label className={labelClass}>Meeting Duration</label>

            <div className="grid grid-cols-2 gap-3">
              {[30, 60].map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  onClick={() => setDuration(minutes as 30 | 60)}
                  className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                    duration === minutes
                      ? "bg-[#00303F] text-white border-[#DCAE1D]"
                      : isLight
                        ? "border-[#CAE4DB] text-[#00303F] hover:border-[#DCAE1D]"
                        : "border-[#7A9D96]/40 text-[#CAE4DB] hover:border-[#DCAE1D]"
                  }`}
                >
                  {minutes} Minutes
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Date */}
          <div>
            <label className={labelClass}>Preferred Date</label>

            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-[#7A9D96]" />

              <input
                type="date"
                required
                min={minDate}
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          {/* Preferred Time */}
          <div>
            <label className={labelClass}>Preferred Time</label>

            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setPreferredTime(time)}
                  className={`rounded-lg border px-2 py-3 text-xs font-semibold transition ${
                    preferredTime === time
                      ? "bg-[#00303F] text-white border-[#DCAE1D]"
                      : isLight
                        ? "border-[#CAE4DB] text-[#00303F] hover:border-[#DCAE1D]"
                        : "border-[#7A9D96]/40 text-[#CAE4DB] hover:border-[#DCAE1D]"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <p className="text-xs text-[#7A9D96] mt-2">
              These are preferred time options, not live availability. The
              adviser will confirm your requested slot.
            </p>
          </div>

          {/* Student Details */}
          <div>
            <h3 className="font-bold mb-3">Student Details</h3>

            <div className="space-y-3">
              <div>
                <label className={labelClass}>Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  required
                  maxLength={100}
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Email Address</label>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  required
                  maxLength={20}
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Meeting Purpose</label>

                <textarea
                  name="purpose"
                  required
                  rows={3}
                  maxLength={1000}
                  placeholder="What would you like to discuss with our advisor?"
                  value={formData.purpose}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* Confirmation Notice */}
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-amber-600" />

              <p className="text-sm font-semibold text-amber-600">
                Awaiting Adviser Confirmation
              </p>
            </div>

            <p className="text-xs text-[#7A9D96] leading-relaxed">
              Submitting this form sends a meeting request. Your appointment
              will only be confirmed after our adviser reviews and approves it.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#00303F] text-white py-3.5 font-semibold hover:bg-[#00485B] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting Request...
              </>
            ) : (
              "Request Meeting"
            )}
          </button>
        </form>
      )}
    </AssistanceModal>
  );
};

export default SpeakWithAdvisorModal;
