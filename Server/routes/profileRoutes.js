import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js"; // JWT auth middleware

const router = express.Router();

router.get("/", getProfile);           // Public
router.put("/",  updateProfile); // Admin only

export default router;
