import express from "express";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../config/cloudinary.js"; // multer + Cloudinary

const router = express.Router();

// Public route
router.get("/", getProjects);

// Admin routes with file upload
router.post("/", upload.single("image"), addProject);
router.put("/:id", upload.single("image"), updateProject);
router.delete("/:id", deleteProject);

export default router;
