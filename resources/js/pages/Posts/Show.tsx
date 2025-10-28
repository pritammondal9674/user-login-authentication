import React from 'react';
import Comments from './Comments';

interface ShowProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
  comments: {
    id: number;
    content: string;
    user: { name: string };
  }[];
}

export default function Show({ post, comments }: ShowProps) {
  console.log("Post data:", post); // 👈 Check if this logs an id
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
      <p className="mb-4 text-gray-700">{post.body}</p>

      {/* ✅ Pass post.id explicitly */}
      <Comments postId={post.id} comments={comments} />
    </div>
  );
}
