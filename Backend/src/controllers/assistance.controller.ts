import type { Request, Response } from "express";

import Counselling from "../models/Counselling.js";
import Support from "../models/Support.js";
import Appointment from "../models/Appointment.js";

import { sendAssistanceEmail } from "../services/email.service.js";

// Submit counselling request
export const createCounsellingRequest = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      country,
      preferredLocation,
      course,
      message,
    } = req.body;

    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email address is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim()) || email.length > 254) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (fullName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must be less than 100 characters.",
      });
    }

    if (message && typeof message === "string" && message.length > 3000) {
      return res.status(400).json({
        success: false,
        message: "Message must be less than 3000 characters.",
      });
    }

    const counselling = await Counselling.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: typeof phone === "string" ? phone.trim().slice(0, 30) : "",
      country: typeof country === "string" ? country.trim().slice(0, 100) : "",
      preferredLocation: typeof preferredLocation === "string" ? preferredLocation.trim().slice(0, 100) : "",
      course: typeof course === "string" ? course.trim().slice(0, 150) : "",
      message: typeof message === "string" ? message.trim() : "",
    });

    try {
      await sendAssistanceEmail({
        type: "Counselling",
        fullName,
        email,
        phone,
        country,
        preferredLocation,
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
    const { fullName, email, preferredLocation, category, subject, message } =
      req.body;

    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email address is required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim()) || email.length > 254) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (!category || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    if (fullName.length > 100 || subject.length > 200 || message.length > 3000) {
      return res.status(400).json({
        success: false,
        message: "Input length exceeds allowed limits.",
      });
    }

    const support = await Support.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      preferredLocation: typeof preferredLocation === "string" ? preferredLocation.trim().slice(0, 100) : "",
      category: typeof category === "string" ? category.trim().slice(0, 100) : "",
      subject: typeof subject === "string" ? subject.trim().slice(0, 200) : "",
      message: typeof message === "string" ? message.trim() : "",
    });

    try {
      await sendAssistanceEmail({
        type: "Student Support",
        fullName,
        email,
        preferredLocation,
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
