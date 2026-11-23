import type { Request, Response } from "express";

import MeetingRequest from "../models/MeetingRequest.js";
import { sendMeetingRequestEmails } from "../services/meetingEmail.service.js";

// Student: Submit an advisor meeting request
export const createMeetingRequest = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phone,
      preferredLocation,
      preferredDate,
      preferredTime,
      duration,
      purpose,
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !preferredDate ||
      !preferredTime ||
      !duration ||
      !purpose
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required meeting details.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // Narrow duration to literal 30 | 60 for Mongoose & MeetingEmailData
    const numericDuration = Number(duration);
    if (numericDuration !== 30 && numericDuration !== 60) {
      return res.status(400).json({
        success: false,
        message: "Meeting duration must be 30 or 60 minutes.",
      });
    }
    const meetingDuration: 30 | 60 = numericDuration;

    const meetingDate = new Date(preferredDate);

    if (Number.isNaN(meetingDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid meeting date.",
      });
    }

    if (meetingDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Please select a future meeting date.",
      });
    }

    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

    if (!timeRegex.test(preferredTime.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid preferred time.",
      });
    }

    const trimmedLocation = preferredLocation?.trim();

    const meetingRequest = await MeetingRequest.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      ...(trimmedLocation ? { preferredLocation: trimmedLocation } : {}),
      preferredDate: meetingDate,
      preferredTime: preferredTime.trim().toUpperCase(),
      duration: meetingDuration,
      purpose: purpose.trim(),
      status: "Pending",
    });

    let emailSent = true;

    try {
      await sendMeetingRequestEmails({
        fullName: meetingRequest.fullName,
        email: meetingRequest.email,
        phone: meetingRequest.phone,
        ...(meetingRequest.preferredLocation
          ? { preferredLocation: meetingRequest.preferredLocation }
          : {}),
        preferredDate: meetingRequest.preferredDate,
        preferredTime: meetingRequest.preferredTime,
        duration: meetingRequest.duration,
        purpose: meetingRequest.purpose,
      });
    } catch (emailError) {
      emailSent = false;
      console.error("Meeting request email failed:", emailError);
    }

    return res.status(201).json({
      success: true,
      message: emailSent
        ? "Meeting request submitted successfully. Await adviser confirmation."
        : "Meeting request saved, but email notification could not be sent. Please contact support.",
      emailSent,
      data: meetingRequest,
    });
  } catch (error) {
    console.error("Meeting request error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit meeting request.",
    });
  }
};
