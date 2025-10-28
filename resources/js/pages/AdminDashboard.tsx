import React from "react";
import { router } from "@inertiajs/react";
import axios from "axios";

const AdminDashboard: React.FC = () => {

  const handleLogout = async () => {
    try {
      //  Get CSRF cookie first
      await axios.get("/sanctum/csrf-cookie", { withCredentials: true });

      // Send logout request
      await axios.post("/logout", {}, { withCredentials: true });

      // Redirect to login
      router.visit("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <header className="w-full max-w-6xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🛠 Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </header>

      <main className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, Admin!</h2>
        <p className="mb-6">
          Here you can manage users, posts, and see platform statistics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => router.visit("/admin/users")}
            className="p-4 bg-purple-100 rounded-lg text-center cursor-pointer hover:bg-purple-200 transition"
          >
            Manage Users
          </div>
          <div
            onClick={() => router.visit("/admin/posts")}
            className="p-4 bg-blue-100 rounded-lg text-center cursor-pointer hover:bg-blue-200 transition"
          >
            Manage Posts
          </div>
          <div className="p-4 bg-green-100 rounded-lg text-center cursor-pointer hover:bg-green-200 transition">
            Statistics
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
