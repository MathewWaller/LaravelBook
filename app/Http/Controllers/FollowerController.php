<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FollowerController extends Controller
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
    public function store(Request $request): Response
    {
        $validated = $request->validate([
            "user_id" => "required",
        ]);

        $validated["follower_user_id"] = $request->user()->id;

        if (!Follower::where("user_id", $validated["user_id"])->where("follower_user_id", $request->user()->id)->exists()) {
            Follower::create($validated);
            $res = ["message" => true];
        } else {
            Follower::where("user_id", $request["user_id"])->where("follower_user_id", $request->user()->id)->delete();
            $res = ["message" => false];
        }

        return Response($res);
    }

    /**
     * Display the specified resource.
     */
    public function show(Follower $follower)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Follower $follower)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Follower $follower)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Follower $follower)
    {
        //
    }
}
