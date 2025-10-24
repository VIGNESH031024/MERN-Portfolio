import express from "express";
import { getAbout, updateAbout } from "../controllers/aboutController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAbout);          // Public
router.put("/", updateAbout);  // Admin only

export default router;
