import "dotenv/config";
import mongoose from "mongoose";

import connectToDB from "../config/db.js";
import Country from "../models/country.model.js";
import CountryCost from "../models/cost.model.js";

const countries = [
  {
    country: "Germany",
    slug: "germany",
    countryCode: "DE",
    flag: "🇩🇪",
    tags: "Engineering · Research · Technology",
    languages: ["German", "English"],
    topUniversities: [
      "TU Munich",
      "RWTH Aachen",
      "Heidelberg University",
      "KIT Karlsruhe",
    ],
    availableIntakes: ["Winter", "Summer"],
  },
  {
    country: "United Kingdom",
    slug: "united-kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    tags: "Medicine · Bioscience · Technology",
    languages: ["English"],
    topUniversities: [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College",
      "UCL",
      "Manchester",
    ],
    availableIntakes: ["Autumn", "Winter", "Spring"],
  },
  {
    country: "Australia",
    slug: "australia",
    countryCode: "AU",
    flag: "🇦🇺",
    tags: "Healthcare · IT · Management",
    languages: ["English"],
    topUniversities: [
      "University of Melbourne",
      "University of Sydney",
      "UNSW Sydney",
      "Monash University",
    ],
    availableIntakes: ["February", "July"],
  },
];

const costRecords = [
  {
    slug: "germany",
    currency: "EUR",
    tuition: { min: 0, max: 5000 },
    livingCost: { min: 10000, max: 15000 },
    insurance: { min: 1200, max: 1500 },
    otherCosts: { min: 500, max: 1500 },
    planningLabels: "Living · Insurance · Other expenses",
    intake: ["Winter", "Summer"],
  },
  {
    slug: "united-kingdom",
    currency: "GBP",
    tuition: { min: 14000, max: 32000 },
    livingCost: { min: 10000, max: 16000 },
    insurance: { min: 500, max: 1200 },
    otherCosts: { min: 1000, max: 2000 },
    planningLabels: "Tuition · Living · Insurance · Other expenses",
    intake: ["Autumn", "Winter", "Spring"],
  },
  {
    slug: "australia",
    currency: "AUD",
    tuition: { min: 30000, max: 48000 },
    livingCost: { min: 25000, max: 30000 },
    insurance: { min: 600, max: 1200 },
    otherCosts: { min: 1000, max: 2500 },
    planningLabels: "Tuition · Living · OSHC · Other expenses",
    intake: ["February", "July"],
  },
];

async function seedCosts() {
  try {
    await connectToDB();

    for (const countryData of countries) {
      await Country.findOneAndUpdate(
        { slug: countryData.slug },
        { $set: countryData },
        {
          upsert: true,
          returnDocument: "after",
          runValidators: true,
        },
      );
    }

    for (const record of costRecords) {
      const country = await Country.findOne({ slug: record.slug });

      if (!country) {
        throw new Error(`Country not found: ${record.slug}`);
      }

      const { slug, ...costData } = record;

      await CountryCost.findOneAndUpdate(
        {
          country: country._id,
          currency: costData.currency,
        },
        {
          $set: {
            ...costData,
            country: country._id,
            notes:
              "Illustrative planning estimates only. Not officially verified.",
            sourceUrl: "",
          },
        },
        {
          upsert: true,
          returnDocument: "after",
          runValidators: true,
        },
      );

      console.log(`Cost record ready: ${country.country}`);
    }

    console.log("Country and cost seeding completed!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedCosts();
