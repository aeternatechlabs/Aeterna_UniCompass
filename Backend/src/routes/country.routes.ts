import { Router } from "express";
import {
  getCountries,
  getCountryById,
} from "../controllers/country.controller.js";
const router = Router();
router.get("/", getCountries);
router.get("/:id", getCountryById);
export default router;
