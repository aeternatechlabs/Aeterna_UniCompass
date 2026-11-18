import { Router } from "express";
import {
  evaluateProfile,
  handleAiChat,
  handleGlobalPathPreview,
} from "../controllers/ai.controller.js";

const router = Router();

router.post("/evaluate", evaluateProfile);
router.post("/chat", handleAiChat);
router.post("/globalpath/preview", handleGlobalPathPreview);

export default router;
