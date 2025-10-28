import React from "react";
import axios from "axios";
import { router } from "@inertiajs/react";

const AdminDashboard: React.FC = () =>
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
            <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white grid place-items-center text-lg font-bold">
              A
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                Admin Dashboard
              </h1>
              <p className="text-sm text-slate-500">
                Manage users, posts & settings
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

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Users</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">—</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 grid place-items-center text-lg">
                👥
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Published Posts</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">—</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 grid place-items-center text-lg">
                📰
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Pending Reviews</p>
                <p className="text-2xl font-semibold text-slate-800 mt-1">—</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 grid place-items-center text-lg">
                ⏳
              </div>
            </div>
          </div>
        </section>

        {/* Primary Actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => router.visit("/admin/users")}
            className="group w-full rounded-2xl bg-white p-6 text-left shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Manage Users</h3>
              <span className="opacity-80 group-hover:translate-x-0.5 transition">➜</span>
            </div>
            <p className="mt-2 text-slate-500 text-sm">
              Add, edit, or deactivate user accounts.
            </p>
          </button>

          <button
            onClick={() => router.visit("/admin/posts")}
            className="group w-full rounded-2xl bg-white p-6 text-left shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Manage Posts</h3>
              <span className="opacity-80 group-hover:translate-x-0.5 transition">➜</span>
            </div>
            <p className="mt-2 text-slate-500 text-sm">
              Review, publish, or archive posts.
            </p>
          </button>

          <a
            href="/posts"
            className="group block rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">Public Posts</h3>
              <span className="opacity-80 group-hover:translate-x-0.5 transition">➜</span>
            </div>
            <p className="mt-2 text-slate-500 text-sm">
              Open the public posts page in a new view.
            </p>
          </a>
        </section>

        {/* Secondary Panel */}
        <section className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
          <h4 className="text-base font-semibold text-slate-800">Recent Activity</h4>
          <p className="text-slate-500 text-sm mt-2">
            Keep track of the latest admin actions and system changes. (Placeholder)
          </p>
          <div className="mt-4 grid gap-3">
            <div className="flex items-center justify-between border rounded-xl px-4 py-3">
              <span className="text-sm text-slate-700">—</span>
              <span className="text-xs text-slate-500">just now</span>
            </div>
            <div className="flex items-center justify-between border rounded-xl px-4 py-3">
              <span className="text-sm text-slate-700">—</span>
              <span className="text-xs text-slate-500">—</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} — Admin
      </footer>
    </div>
  );
};

export default AdminDashboard;
