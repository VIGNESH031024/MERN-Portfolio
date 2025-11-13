import axios from "axios";

const isProduction = import.meta.env.MODE === "production";

const baseURL = isProduction
  ? "/api/apiProxy" // Works on Vercel after deploy
  : "https://mern-portfolio-64fw.onrender.com/api"; // Direct Render backend for local

const adminApi = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminApi;
