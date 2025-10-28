import React from 'react';
import { useForm } from '@inertiajs/react';

interface CommentProps {
  postId: number;
  comments: { id: number; content: string; user: { name: string } }[];
}

export default function Comments({ postId, comments = [] }: CommentProps) {
  const { data, setData, post, reset } = useForm({ content: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/posts/${postId}/comments`, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Comments</h3>

      {comments.map((comment) => (
        <div key={comment.id} className="border p-2 rounded mb-2">
          <p className="text-sm text-gray-700">{comment.content}</p>
          <p className="text-xs text-gray-500 mt-1">— {comment.user.name}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={data.content}
          onChange={(e) => setData('content', e.target.value)}
          className="border w-full p-2 rounded mb-2"
          placeholder="Write a comment..."
        />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
          Comment
        </button>
      </form>
    </div>
  );
}
