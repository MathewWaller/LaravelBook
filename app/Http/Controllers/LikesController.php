<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\likes;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\RedirectResponse;

class LikesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request,likes $likes) : Response
    {
     
        $validated = $request->validate([
            'post_id' => 'required|int|max:200',
            'author_id' => 'required|int|max:200'
        ]);

        $validated['user_id'] = auth()->id();

        Gate::authorize('update', [$likes, $request['id']]);

        $likes->update($validated);

        $request->user()->like()->create($validated);

        $likes = likes::where('user_id', $request->user()->id)->get("post_id");
        $flippedLikes = array();
        for($i = 0; $i < count($likes); $i++){
            $flippedLikes[] = $likes[$i]->id;
        }

        return Response(["message" => $request->user()->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(likes $likes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(likes $likes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, likes $likes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'post_id' => 'required|int|max:200',
        ]);

        likes::where("post_id", $request["post_id"])->where("user_id", $request->user()->id)->delete();       
    }
}
