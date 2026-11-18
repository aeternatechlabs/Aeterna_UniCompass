import type { Request, Response } from "express";
import {
  evaluateStudentProfile,
  generateChatReply,
  type ProfileEvaluationInput,
  type ChatHistoryItem,
  type StudentChatContext,
} from "../services/ai.service.js";


export const evaluateProfile = async (req: Request, res: Response) => {
  try {
    const body = req.body as Partial<ProfileEvaluationInput>;
    const {
      undergraduateCourse,
      targetDestination,
      fieldOfSpecialisation,
      targetBudget,
    } = body;

    if (
      !undergraduateCourse ||
      !targetDestination ||
      !fieldOfSpecialisation ||
      !targetBudget
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All profile fields are required" });
    }

    const data = await evaluateStudentProfile({
      undergraduateCourse,
      targetDestination,
      fieldOfSpecialisation,
      targetBudget,
    });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("evaluateProfile:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      success: false,
      message: "Failed to evaluate profile",
      error: message,
    });
  }
};

export const handleAiChat = async (req: Request, res: Response) => {
  try {
    const body = req.body as {
      message?: string;
      filters?: StudentChatContext;
      history?: ChatHistoryItem[];
    };
    if (!body.message?.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "message is required" });
    }

    const history = Array.isArray(body.history)
      ? body.history.filter(
          (item) =>
            item &&
            (item.sender === "ai" || item.sender === "user") &&
            typeof item.text === "string",
        )
      : [];

    const reply = await generateChatReply(
      body.message.trim(),
      body.filters,
      history,
    );
    return res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("handleAiChat:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      success: false,
      message: "AI chat service failed",
      error: message,
    });
  }
};
