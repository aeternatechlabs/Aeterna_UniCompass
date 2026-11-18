import mongoose, { Schema, Document } from "mongoose";

export type MeetingStatus =
  | "Pending"
  | "Confirmed"
  | "Rejected"
  | "Cancelled"
  | "Completed";

export interface IMeetingRequest extends Document {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: Date;
  preferredTime: string;
  duration: 30 | 60;
  purpose: string;
  status: MeetingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const meetingRequestSchema = new Schema<IMeetingRequest>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    preferredDate: {
      type: Date,
      required: true,
    },

    preferredTime: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number,
      enum: [30, 60],
      required: true,
    },

    purpose: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Rejected", "Cancelled", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IMeetingRequest>(
  "MeetingRequest",
  meetingRequestSchema,
);
