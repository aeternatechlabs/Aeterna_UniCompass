import mongoose from "mongoose";

const pathwaySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    degreeLevel: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "",
    },
    requirements: [{ type: String }],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Pathway: mongoose.Model<any> =
  (mongoose.models.Pathway as mongoose.Model<any>) ||
  mongoose.model<any>("Pathway", pathwaySchema);

export default Pathway;
