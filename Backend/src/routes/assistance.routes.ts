import { Router } from "express";

import {
  createCounsellingRequest,
  createSupportRequest,
} from "../controllers/assistance.controller.js";

import { createMeetingRequest } from "../controllers/meeting.controller.js";

const router = Router();

// Student counselling form submission
router.post("/counselling", createCounsellingRequest);

// Student support form submission
router.post("/support", createSupportRequest);

// Student advisor meeting request
router.post("/meetings", createMeetingRequest);

export default router;
