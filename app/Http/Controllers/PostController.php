<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    /**
     * Get all posts
     */
    public function index(): JsonResponse
    {
        $posts = Post::latest()->get();
        return response()->json([
            'success' => true,
            'data' => $posts
        ]);
    }

    /**
     * Get single post
     */
    public function show($id): JsonResponse
    {
        $post = Post::find($id);
        
        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $post
        ]);
    }

    /**
     * Create new post
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|min:3|max:255',
            'content' => 'required|string|min:10',
        ]);
        
        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Post created successfully',
            'data' => $post
        ], 201);
    }

    /**
     * Update post
     */
    public function update(Request $request, $id): JsonResponse
    {
        $post = Post::find($id);
        
        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found'
            ], 404);
        }
        
        $request->validate([
            'title' => 'sometimes|required|string|min:3|max:255',
            'content' => 'sometimes|required|string|min:10',
        ]);
        
        $post->update($request->only(['title', 'content']));
        
        return response()->json([
            'success' => true,
            'message' => 'Post updated successfully',
            'data' => $post
        ]);
    }

    /**
     * Delete post
     */
    public function destroy($id): JsonResponse
    {
        $post = Post::find($id);
        
        if (!$post) {
            return response()->json([
                'success' => false,
                'message' => 'Post not found'
            ], 404);
        }
        
        $post->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Post deleted successfully'
        ]);
    }
}