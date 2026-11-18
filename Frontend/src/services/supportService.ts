const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface CounsellingData {
  fullName: string;
  email: string;
  phone: string;
  preferredDestination: string;
  courseInterest: string;
  message: string;
}

export interface SupportData {
  fullName: string;
  email: string;
  category: string;
  subject: string;
  message: string;
}

async function sendRequest<T>(endpoint: string, data: T) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong.");
  }

  return result;
}

export const submitCounsellingRequest = (data: CounsellingData) =>
  sendRequest("/api/support/counselling", data);

export const submitSupportRequest = (data: SupportData) =>
  sendRequest("/api/support/ticket", data);
