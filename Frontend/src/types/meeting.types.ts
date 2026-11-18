export interface MeetingRequestData {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  duration: 30 | 60;
  purpose: string;
}

export interface MeetingResponse {
  success: boolean;
  message: string;
  emailSent: boolean;
}
