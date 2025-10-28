<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; 

class PostController extends Controller
{
use AuthorizesRequests; 
// List all posts
public function index()
{
	return inertia('Posts/Index', [
		'posts' => Post::with('user')->latest()->get(),
		'auth' => ['user' => Auth::user()],
	]);
}

// Show create form
public function create()
{
	return inertia('Posts/Create');
}

// Store a new post
public function store(Request $request)
{
	$request->validate([
		'title' => 'required|string|max:255',
		'content' => 'required|string',
	]);

	Post::create([
		'title' => $request->title,
		'content' => $request->content,
		'user_id' => Auth::id(),
	]);

	return redirect()->route('posts.index')->with('success', 'Post created successfully!');
}

// Show edit form
public function edit(Post $post)
{
	$this->authorize('update', $post);
	return inertia('Posts/Edit', ['post' => $post]);
}

// Update post
public function update(Request $request, Post $post)
{
	$this->authorize('update', $post);

	$request->validate([
		'title' => 'required|string|max:255',
		'content' => 'required|string',
	]);

	$post->update($request->only(['title', 'content']));

	return redirect()->route('posts.index')->with('success', 'Post updated!');
}


public function destroy(Post $post)
{
	if (auth()->user()->id !== $post->user_id && !auth()->user()->hasRole('admin')) {
		return redirect()->back()->with('error', 'You are not allowed to delete this post.');
	}

	$post->delete();

	return redirect()->route('posts.index')->with('success', 'Post deleted successfully.');
}



public function show(Post $post)
{
	return inertia('Posts/Show', [
		'post' => $post->load(['user', 'comments.user']),
		'comments' => $post->comments()->with('user')->get(),
	]);
}

}
