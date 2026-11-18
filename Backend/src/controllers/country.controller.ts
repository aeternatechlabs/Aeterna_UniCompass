import type { Request, Response } from "express";
import Country from "../models/country.model.js";

export const getCountries = async (_req: Request, res: Response) => {
  try {
    const data = await Country.find({ isActive: true }).sort({ country: 1 });
    return res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    console.error("getCountries:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch countries" });
  }
};

export const getCountryById = async (req: Request, res: Response) => {
  try {
    const data = await Country.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
      isActive: true,
    });
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "Country not found" });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("getCountryById:", error);
    return res
      .status(400)
      .json({ success: false, message: "Invalid country ID" });
  }
};
