import mongoose from "mongoose";

const rangeSchema = new mongoose.Schema(
  {
    min: { type: Number, required: true, min: 0 },
    max: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const costSchema = new mongoose.Schema(
  {
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
      index: true,
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    tuition: { type: rangeSchema, required: true },
    livingCost: { type: rangeSchema, required: true },
    insurance: {
      type: rangeSchema,
      default: { min: 0, max: 0 },
    },
    otherCosts: {
      type: rangeSchema,
      default: { min: 0, max: 0 },
    },
    planningLabels: { type: String, default: "" },
    intake: [{ type: String }],
    sourceUrl: { type: String, default: "" },
    verifiedAt: { type: Date },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

costSchema.index({ country: 1, currency: 1 }, { unique: true });

const CountryCost: mongoose.Model<any> =
  (mongoose.models.CountryCost as mongoose.Model<any>) ||
  mongoose.model<any>("CountryCost", costSchema);

export default CountryCost;
