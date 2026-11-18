import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  fullName: string;
  email: string;
  eventUri: string;
  startTime: Date;
  endTime?: Date;
  status: "Scheduled" | "Cancelled" | "Completed";
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>(
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
    eventUri: {
      type: String,
      required: true,
      unique: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Cancelled", "Completed"],
      default: "Scheduled",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IAppointment>("Appointment", appointmentSchema);
