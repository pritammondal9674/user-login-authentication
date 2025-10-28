import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia';

// @ts-ignore
import { route } from "ziggy-js";

interface User
{
  id: number;
  name: string;
  email: string;
}

interface Post
{
  id: number;
  title: string;
  content: string;
  created_at: string;
  user: User;
}

interface PageProps
{
  posts: Post[];
  auth: {
    user: User;
  };
}

const Index: React.FC = () =>
{
  const { posts, auth } = usePage<PageProps>().props;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white grid place-items-center text-lg font-bold">
              {auth?.user?.name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                Posts
              </h1>
              <p className="text-sm text-slate-500">
                Welcome, {auth?.user?.name ?? "User"}
              </p>
            </div>
          </div>

          <Link
            href={route("posts.create")}
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white px-4 py-2 font-medium transition"
          >
            <span>＋ New Post</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Summary / Toolbar */}
        <section className="rounded-2xl bg-white shadow-sm border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Total Posts</p>
            <p className="text-2xl font-semibold text-slate-800 mt-1">
              {posts.length}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={route("posts.create")}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium transition"
            >
              Create Post
            </Link>
          </div>
        </section>

        {/* Empty State */}
        {posts.length === 0 && (
          <section className="rounded-2xl bg-white shadow-sm border border-slate-200 p-8 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-slate-100 grid place-items-center text-xl">
              📝
            </div>
            <h2 className="text-lg font-semibold text-slate-800">
              No posts yet
            </h2>
            <p className="text-slate-500 mt-1">
              Get started by creating your first post.
            </p>
            <div className="mt-4">
              <Link
                href={route("posts.create")}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm font-medium transition"
              >
                Create Post
              </Link>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        {posts.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group rounded-2xl bg-white shadow-sm border border-slate-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {post.title}
                  </h3>
                  <Link
                        href={route("posts.show", post.id)}
                        className="text-blue-600 hover:underline text-sm"
                        >
                        View Details
                        </Link>
                  <Link
                    href={route("posts.edit", post.id)}
                    className="shrink-0 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-1.5 text-sm font-medium transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                        if (confirm("Are you sure you want to delete this post?")) {
                        Inertia.delete(route("posts.destroy", post.id), {
                            preserveScroll: true,
                            onSuccess: () => {
                            alert("✅ Post deleted successfully!");
                            },
                            onError: (errors: any) => {
                            console.error(errors);
                            alert("❌ You are not allowed to delete this post!");
                            },
                        });
                        }
                     }}
                        className="shrink-0 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 px-3 py-1.5 text-sm font-medium transition"
                        >
                        ⌫
                    </button>



                </div>

                <p className="text-slate-600 mt-3 leading-relaxed">
                  {post.content}
                </p>

                <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 rounded-full bg-slate-100 text-slate-700 items-center justify-center text-xs font-semibold">
                      {post.user?.name?.charAt(0)?.toUpperCase() ?? "A"}
                    </span>
                    <span className="font-medium text-slate-700">
                      {post.user?.name}
                    </span>
                  </div>
                  <time className="tabular-nums">
                    {new Date(post.created_at).toLocaleDateString()}
                  </time>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} — Posts
      </footer>
    </div>
  );
};

export default Index;
