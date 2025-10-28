import React, { useState } from "react";
import axios from "axios";
import { router } from "@inertiajs/react";

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      return alert("Please fill both email and password");
    }
  
    try {
      setLoading(true);
      await axios.get("/sanctum/csrf-cookie", { withCredentials: true });
  
      const response = await axios.post(
        "/auth/login",
        { email, password },
        {
          withCredentials: true,
          headers: { Accept: "application/json" },
        }
      );
  
      const user = response.data.user;
      if (!user) {
        return alert("Invalid response from server");
      }
  
      if (user.role === "admin") {
        router.visit("/admin-dashboard");
      } else {
        router.visit("/user-dashboard");
      }
  
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message || "Login failed");
      } else {
        console.error(err);
        alert("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          🔑 User Login
        </h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-gray-800 transition"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none text-gray-800 transition"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-bold text-white text-lg transition duration-200 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline font-semibold">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
