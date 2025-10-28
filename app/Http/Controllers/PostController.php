<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    // Get all posts
    public function index()
    {
        return Post::all();
    }

    // Create a new post
    public function store(Request $request)
    {
        return Post::create([
            'title' => $request->title,
            'content' => $request->content
        ]);
    }
}
