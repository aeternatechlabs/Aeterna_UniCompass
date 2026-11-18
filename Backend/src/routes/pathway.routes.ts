import { Router } from "express";
import {
  discoverPathways,
  getPopularPathways,
} from "../controllers/pathway.controller.js";
const router = Router();
router.get("/popular", getPopularPathways);
router.post("/discover", discoverPathways);
export default router;
