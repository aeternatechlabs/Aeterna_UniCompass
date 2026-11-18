import type { Request, Response } from "express";
import Pathway from "../models/pathway.model.js";

interface DiscoverBody {
  education?: string;
  field?: string;
  budget?: string;
  destination?: string;
}

const budgetInINR = (label: string) => {
  const values = (label.replace(/,/g, "").match(/\d+(?:\.\d+)?/g) ?? []).map(
    Number,
  );

  if (label.toLowerCase().includes("below")) {
    return { min: 0, max: (values[0] ?? 8) * 100000 };
  }

  if (label.toLowerCase().includes("above")) {
    return {
      min: (values[0] ?? 35) * 100000,
      max: null as number | null,
    };
  }

  if (values.length >= 2) {
    const minValue = values[0] ?? 0;
    const maxValue = values[1] ?? 0;

    return {
      min: minValue * 100000,
      max: maxValue * 100000,
    };
  }

  return { min: 0, max: null as number | null };
};

export const discoverPathways = async (
  req: Request<unknown, unknown, DiscoverBody>,
  res: Response,
) => {
  try {
    const { education, field, budget, destination } = req.body;

    if (!education || !field || !budget || !destination) {
      return res.status(400).json({
        success: false,
        message: "education, field, budget and destination are required",
      });
    }

    const range = budgetInINR(budget);

    const filter: Record<string, unknown> = {
      isActive: true,
      educationLevels: education,
      fields: field,
      budgetMinINR: {
        $lte: range.max ?? Number.MAX_SAFE_INTEGER,
      },
    };

    if (destination !== "Open to all countries") {
      filter.destinations = destination;
    }

    if (range.min > 0) {
      filter.$or = [
        { budgetMaxINR: null },
        { budgetMaxINR: { $gte: range.min } },
      ];
    }

    const data = await Pathway.find(filter).sort({ title: 1 });

    return res.status(200).json({
      success: true,
      count: data.length,
      filters: { education, field, budget, destination },
      data,
    });
  } catch (error) {
    console.error("discoverPathways:", error);

    return res.status(500).json({
      success: false,
      message: "Pathway discovery failed",
    });
  }
};

export const getPopularPathways = async (_req: Request, res: Response) => {
  try {
    const data = await Pathway.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(12);

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("getPopularPathways:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pathways",
    });
  }
};
