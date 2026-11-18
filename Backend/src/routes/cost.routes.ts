import { Router } from "express";
import { getCountryCosts } from "../controllers/cost.controller.js";
const router = Router();
router.get("/", getCountryCosts);
export default router;
