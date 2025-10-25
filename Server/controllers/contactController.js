import ContactInfo from "../models/ContactInfo.js"; // your model for email, phone, address, linkedin
import Message from "../models/Message.js";         // model to store messages
import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config(); // << This MUST come before using process.env


// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// GET: fetch contact info
export const getContactInfo = async (req, res) => {
  try {
    const info = await ContactInfo.findOne();
    res.json(info || {});
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST: send message + email
export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save message in DB
    await Message.create({ name, email, message });

    // Send email notification
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL, // your email
      subject: `Hey VS, New Message from Portfolio: ${name}`,
      text: `
You have a new message from your portfolio contact form:

Name: ${name}
Email: ${email}
Message:
${message}
      `,
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  return res.status(500).json({ message: "Email credentials missing in .env" });
}

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
