import React from 'react';
import { Link, useForm } from '@inertiajs/react';

interface Post
{
  id: number;
  title: string;
  content: string;
}

interface EditProps
{
  post: Post;
  auth: { user: any };
}

export default function Edit({ post, auth }: EditProps)
{
  const { data, setData, put, processing, errors } = useForm({
    title: post.title ?? '',
    content: post.content ?? '',
  });

  const handleSubmit = (e: React.FormEvent) =>
  {
    e.preventDefault();
    put(`/posts/${post.id}`);
  };

  const titleCount = data.title.trim().length;
  const contentCount = data.content.trim().length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white grid place-items-center text-lg font-bold">
              {auth?.user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                Edit Post
              </h1>
              <p className="text-sm text-slate-500">
                Welcome, {auth?.user?.name ?? 'User'}
              </p>
            </div>
          </div>

          <Link
            href="/posts"
            className="rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 text-sm font-medium transition"
          >
            ← Back to Posts
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                placeholder="Post title"
                className={`w-full rounded-xl border ${
                  errors.title ? 'border-red-400' : 'border-slate-300'
                } bg-white px-4 py-2.5 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500`}
                disabled={processing}
              />
              <div className="mt-1 flex items-center justify-between">
                <p className="text-sm text-red-600 min-h-[1.25rem]">
                  {errors.title || ''}
                </p>
                <p className="text-xs text-slate-500">{titleCount}/120</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Content
              </label>
              <textarea
                value={data.content}
                onChange={(e) => setData('content', e.target.value)}
                placeholder="Update your content…"
                rows={8}
                className={`w-full rounded-xl border ${
                  errors.content ? 'border-red-400' : 'border-slate-300'
                } bg-white px-4 py-3 text-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 resize-y`}
                disabled={processing}
              />
              <div className="mt-1 flex items-center justify-between">
                <p className="text-sm text-red-600 min-h-[1.25rem]">
                  {errors.content || ''}
                </p>
                <p className="text-xs text-slate-500">{contentCount} chars</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={processing}
                className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition ${
                  processing ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {processing ? 'Updating…' : 'Update Post'}
              </button>

              <Link
                href="/posts"
                className="rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 text-sm font-medium transition"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>

      <footer className="max-w-3xl mx-auto px-4 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} — Posts
      </footer>
    </div>
  );
}
