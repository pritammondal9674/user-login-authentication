import React from "react";
import axios from "axios";
import { router } from "@inertiajs/react";

const UserDashboard = () =>
{
  const handleLogout = async () =>
  {
    try
    {
      await axios.get("/sanctum/csrf-cookie", { withCredentials: true });
      await axios.post("/logout", {}, { withCredentials: true });
      router.visit("/login");
    }
    catch (err)
    {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 text-white grid place-items-center text-lg font-bold">
              U
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                User Dashboard
              </h1>
              <p className="text-sm text-slate-500">
                Welcome back
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white px-4 py-2 font-medium transition"
          >
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Posts</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">—</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 grid place-items-center text-lg">
                📄
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Comments</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">—</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 grid place-items-center text-lg">
                💬
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Activity</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">—</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 grid place-items-center text-lg">
                ⚡
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            className="group w-full rounded-2xl bg-white p-6 text-left shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Create Post</h3>
              <span className="opacity-80 group-hover:translate-x-0.5 transition">➜</span>
            </div>
            <p className="mt-2 text-slate-500 text-sm">
              Draft a new post and share your thoughts.
            </p>
          </button>

          <a
            href="/posts"
            className="group block rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Manage Posts</h3>
              <span className="opacity-80 group-hover:translate-x-0.5 transition">➜</span>
            </div>
            <p className="mt-2 text-slate-500 text-sm">
              View, edit, and organize your posts.
            </p>
          </a>

          <button
            className="group w-full rounded-2xl bg-white p-6 text-left shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">My Comments</h3>
              <span className="opacity-80 group-hover:translate-x-0.5 transition">➜</span>
            </div>
            <p className="mt-2 text-slate-500 text-sm">
              Review your recent discussions.
            </p>
          </button>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} — Dashboard
      </footer>
    </div>
  );
};

export default UserDashboard;
