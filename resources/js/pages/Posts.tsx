import React, { useState, useEffect } from "react";
import axios from "axios"; // helps us make HTTP (API) requests

function App() {
  // 🧱 Step 1: Create variables (states) to store data
  const [posts, setPosts] = useState([]); // store all posts from backend
  const [title, setTitle] = useState(""); // store title input
  const [content, setContent] = useState(""); // store content input

  // 🧩 Step 2: Function to get all posts from backend API
  const fetchPosts = async () => {
    try {
      // call your backend API (GET method)
      const response = await axios.get("http://127.0.0.1:8000/api/posts");

      // store the response data (array of posts)
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // 🧩 Step 3: Function to create a new post (POST method)
  const createPost = async (event) => {
    event.preventDefault(); // stop page from reloading

    // check if inputs are empty
    if (!title.trim() || !content.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      // send data to backend API
      await axios.post("http://127.0.0.1:8000/api/posts", {
        title: title,
        content: content,
      });

      // after saving, clear inputs
      setTitle("");
      setContent("");

      // refresh posts list
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // 🧩 Step 4: Run fetchPosts() when page loads
  useEffect(() => {
    fetchPosts();
  }, []); // empty [] = only runs once when app starts

  // 🧩 Step 5: Design what the UI looks like (HTML + TailwindCSS)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* App Title */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        📝 Post Creator
      </h1>

      {/* --- FORM SECTION --- */}
      <form
        onSubmit={createPost} // call createPost() when form submitted
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mb-10"
      >
        {/* Title Input */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter post title..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            value={title} // show what's typed
            onChange={(e) => setTitle(e.target.value)} // update title value
          />
        </div>

        {/* Content Input */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-1">
            Content
          </label>
          <textarea
            placeholder="Write your post here..."
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-200"
        >
          Publish Post
        </button>
      </form>

      {/* --- DISPLAY POSTS SECTION --- */}
      <div className="w-full max-w-3xl grid gap-6">
        {posts.length === 0 ? (
          // If no posts found
          <p className="text-gray-600 text-center">No posts yet. Create one!</p>
        ) : (
          // Loop through posts array and show each post
          posts.map((post) => (
            <div
              key={post.id || post._id} // every item needs a unique key
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {post.content}
              </p>
              <p className="text-sm text-gray-400 mt-3">
                Posted on{" "}
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleString()
                  : "just now"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
