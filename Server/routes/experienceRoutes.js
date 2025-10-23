import express from "express";
import { getExperiences, addExperience, updateExperience, deleteExperience } from "../controllers/experienceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getExperiences);            // Public
router.post("/", addExperience);   // Admin only
router.put("/:id", updateExperience);   // Admin only
router.delete("/:id", deleteExperience); // Admin only

export default router;
