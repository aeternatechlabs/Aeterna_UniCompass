import React from "react";
import type { ThemeMode } from "../types";
import { AssistanceModal } from "../components/AssistanceModal";

interface SpeakWithAdvisorModalProps {
  theme: ThemeMode;
  onClose: () => void;
}

const SpeakWithAdvisorModal: React.FC<SpeakWithAdvisorModalProps> = ({
  theme,
  onClose,
}) => {
  // Replace this with your actual Calendly event URL.
  const calendlyUrl = "https://calendly.com/YOUR_USERNAME/your-event";

  return (
    <AssistanceModal
      title="Speak with an Advisor"
      description="Schedule a personal consultation with our study-abroad advisor."
      theme={theme}
      onClose={onClose}
    >
      <div className="rounded-xl overflow-hidden border border-[#7A9D96]/30">
        <iframe
          src={`${calendlyUrl}?hide_gdpr_banner=1`}
          title="Book a meeting with a UniCompass advisor"
          width="100%"
          height="650"
          frameBorder="0"
          loading="lazy"
        />
      </div>
    </AssistanceModal>
  );
};
export default SpeakWithAdvisorModal;
