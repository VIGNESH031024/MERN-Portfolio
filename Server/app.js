import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",           // React dev server
  "http://localhost:5173",           // Vite dev server
  "https://vignesh-vs.vercel.app"   // deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server-to-server
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("Not allowed by CORS"));
    }
    return callback(null, true);
  },
  credentials: true, // if you use cookies or Authorization headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

// Example health check route
app.get("/healthcheck", (req, res) => res.json({ status: "success" }));

export default app;
