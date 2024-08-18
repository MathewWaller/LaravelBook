<?php

namespace App\Http\Controllers;


use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() : Response
    {
        return inertia::render('Posts/Index', [
            'posts'=> Post::with('user:id,name')->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) : RedirectResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:200',
            'audience' => 'required|string|max:20',
        ]);

        $request->user()->posts()->create($validated);

        return redirect(route('posts.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Post $post)
    {
        $p = Post::with('user:id,name')->where('id', $request['id'])->get();

        if (Gate::denies('view', [$p, $request['id']])) {
            return inertia::render('Posts/AccessDenied', [
                'posts'=> $p[0]
            ]);
        }

        return inertia::render('Posts/View', [
            'posts'=> $p[0]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post) : RedirectResponse
    {
        Gate::authorize('update', $post);

        $validated = $request->validate([
            'message' => 'required|string|max:200',
            'audience' => 'required|string|max:50'
        ]);

        $post->update($validated);

        return redirect(route('posts.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        Gate::authorize('delete', $post);
        $post->delete();
        return redirect(route('posts.index'));
    }
}
