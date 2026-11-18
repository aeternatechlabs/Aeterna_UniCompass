import type { Request, Response } from "express";
import CountryCost from "../models/cost.model.js";

export const getCountryCosts = async (req: Request, res: Response) => {
  try {
    const filter: Record<string, unknown> = {};
    if (typeof req.query.country === "string")
      filter.country = req.query.country;
    if (typeof req.query.currency === "string")
      filter.currency = req.query.currency.toUpperCase();

    const data = await CountryCost.find(filter)
      .populate("country", "country slug flag languages availableIntakes")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    console.error("getCountryCosts:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch cost data" });
  }
};
