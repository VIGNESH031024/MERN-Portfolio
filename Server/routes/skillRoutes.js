import express from "express";
import { getSkills, addSkill, updateSkill, deleteSkill } from "../controllers/skillController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getSkills);           // Public
router.post("/", addSkill);  // Admin only
router.put("/:id", updateSkill); // Admin only
router.delete("/:id", deleteSkill); // Admin only

export default router;
