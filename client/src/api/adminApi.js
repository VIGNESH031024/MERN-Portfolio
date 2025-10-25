import axios from "axios";

const adminApi = axios.create({
  baseURL: "http://localhost:5000/api", // your backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests automatically
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken"); // store JWT here
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminApi;
