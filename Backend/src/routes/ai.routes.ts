import { Router } from "express";
import { evaluateProfile, handleAiChat } from "../controllers/ai.controller.js";
const router = Router();
router.post("/evaluate", evaluateProfile);
router.post("/chat", handleAiChat);
export default router;
