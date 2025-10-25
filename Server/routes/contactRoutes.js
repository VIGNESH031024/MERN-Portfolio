import express from "express";
import { getContactInfo, sendMessage } from "../controllers/contactController.js";

const router = express.Router();

router.get("/", getContactInfo);              // fetch contact info
router.post("/sendMessage", sendMessage);     // send message + email

export default router;
