import mongoose from "mongoose";

const countrySchema = new mongoose.Schema(
  {
    country: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    countryCode: { type: String, uppercase: true, trim: true },
    flag: { type: String, default: "" },
    tags: { type: String, default: "" },
    image: { type: String, default: "" },
    tuitionOverview: { type: String, default: "" },
    visaHighlights: { type: String, default: "" },
    languages: [{ type: String }],
    topUniversities: [{ type: String }],
    availableIntakes: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Country: mongoose.Model<any> =
  (mongoose.models.Country as mongoose.Model<any>) ||
  mongoose.model<any>("Country", countrySchema);

export default Country;
