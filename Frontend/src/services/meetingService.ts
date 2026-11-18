import type {
  MeetingRequestData,
  MeetingResponse,
} from "../types/meeting.types";

export const submitMeetingRequest = async (
  data: MeetingRequestData,
): Promise<MeetingResponse> => {
  const response = await fetch(
    "http://localhost:3000/api/assistance/meetings",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Unable to submit meeting request.");
  }

  return result;
};
