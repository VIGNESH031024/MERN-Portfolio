import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../api/adminApi";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await adminApi.post("/auth/login", { username, password });
      const token = res.data.token;

      // Save JWT to localStorage
      localStorage.setItem("adminToken", token);

      // Navigate to dashboard
      navigate("/admin");
    } catch (err) {
      console.log(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
          Admin Login
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
          required
        />
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 py-2 rounded font-semibold transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
