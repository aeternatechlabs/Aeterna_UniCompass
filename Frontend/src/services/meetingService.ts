import type {
  MeetingRequestData,
  MeetingResponse,
} from "../types/meeting.types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const submitMeetingRequest = async (
  data: MeetingRequestData,
): Promise<MeetingResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/assistance/meetings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Unable to submit meeting request.");
  }

  return result;
};
