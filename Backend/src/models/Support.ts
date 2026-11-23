import mongoose, { Schema, Document } from "mongoose";

export interface ISupport extends Document {
  fullName: string;
  email: string;
  preferredLocation?: string;
  category: string;
  subject: string;
  message: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: Date;
  updatedAt: Date;
}

const supportSchema = new Schema<ISupport>(
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
    preferredLocation: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
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

export default mongoose.model<ISupport>("Support", supportSchema);
