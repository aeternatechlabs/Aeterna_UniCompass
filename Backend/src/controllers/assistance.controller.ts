import type { Request, Response } from "express";

import Counselling from "../models/Counselling.js";
import Support from "../models/Support.js";
import Appointment from "../models/Appointment.js";

import { sendAssistanceEmail } from "../services/email.service.js";

// Submit counselling request
export const createCounsellingRequest = async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, country, course, message } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required.",
      });
    }

    const counselling = await Counselling.create({
      fullName,
      email,
      phone,
      country,
      course,
      message,
    });

    try {
      await sendAssistanceEmail({
        type: "Counselling",
        fullName,
        email,
        phone,
        country,
        course,
        message,
      });
    } catch (emailError) {
      console.error("Counselling notification email failed:", emailError);
    }

    return res.status(201).json({
      success: true,
      message: "Counselling request submitted successfully.",
      data: counselling,
    });
  } catch (error) {
    console.error("Counselling request error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit counselling request.",
    });
  }
};

// Submit student support request
export const createSupportRequest = async (req: Request, res: Response) => {
  try {
    const { fullName, email, category, subject, message } = req.body;

    if (!fullName || !email || !category || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const support = await Support.create({
      fullName,
      email,
      category,
      subject,
      message,
    });

    try {
      await sendAssistanceEmail({
        type: "Student Support",
        fullName,
        email,
        category,
        subject,
        message,
      });
    } catch (emailError) {
      console.error("Support notification email failed:", emailError);
    }

    return res.status(201).json({
      success: true,
      message: "Support request submitted successfully.",
      data: support,
    });
  } catch (error) {
    console.error("Support request error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit support request.",
    });
  }
};

// Admin: get all counselling requests
export const getCounsellingRequests = async (req: Request, res: Response) => {
  try {
    const requests = await Counselling.find().sort({ createdAt: -1 }).lean();

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Get counselling requests error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch counselling requests.",
    });
  }
};

// Admin: get all support requests
export const getSupportRequests = async (req: Request, res: Response) => {
  try {
    const requests = await Support.find().sort({ createdAt: -1 }).lean();

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Get support requests error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch support requests.",
    });
  }
};

// Admin: get advisor appointments
export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find()
      .sort({ startTime: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error("Get appointments error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch appointments.",
    });
  }
};

// Admin: update counselling request status
export const updateCounsellingStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!["Pending", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const request = await Counselling.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Counselling request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully.",
      data: request,
    });
  } catch (error) {
    console.error("Update counselling status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update counselling status.",
    });
  }
};

// Admin: update support request status
export const updateSupportStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    if (!["Pending", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const request = await Support.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Support request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully.",
      data: request,
    });
  } catch (error) {
    console.error("Update support status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update support status.",
    });
  }
};
