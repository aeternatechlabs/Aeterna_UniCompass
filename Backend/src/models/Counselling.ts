import mongoose, { Schema, Document } from "mongoose";

export interface ICounselling extends Document {
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  course?: string;
  message?: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: Date;
  updatedAt: Date;
}

const counsellingSchema = new Schema<ICounselling>(
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
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    course: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model<ICounselling>("Counselling", counsellingSchema);
