<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Post;
use App\Models\Follower;
use App\Models\likes;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }



    public function index(Request $request, $user_id = null) : Response{  
        if(is_null($user_id)){

            $likes = likes::where('user_id', auth()->user()->id)->get();
            $flippedLikes = array();
            for($i = 0; $i < count($likes); $i++){
                $flippedLikes[] = $likes[$i]['post_id'];
            }
    
            $followers = Follower::where('follower_user_id', auth()->user()->id)->get('user_id');
            $flippedFollowers = array();
            for($i = 0; $i < count($followers); $i++){
                $flippedFollowers[] = $followers[$i]['user_id'];
            }

            $return = [
                "posts" => Post::with('user:id,name')->where("user_id", auth()->user()->id)->latest()->get(),
                "likes" => $flippedLikes,
                "followed" => $flippedFollowers
            ];
        }else{
            
            $likes = likes::where('user_id', $user_id)->get();
            $flippedLikes = array();
            for($i = 0; $i < count($likes); $i++){
                $flippedLikes[] = $likes[$i]['post_id'];
            }
    
            $followers = Follower::where('follower_user_id', $user_id)->get('user_id');
            $flippedFollowers = array();
            for($i = 0; $i < count($followers); $i++){
                $flippedFollowers[] = $followers[$i]['user_id'];
            }

            $return = [
                "posts" => Post::with('user:id,name')->where("user_id", $user_id)->latest()->get(),
                "likes" => $flippedLikes,
                "followed" => $flippedFollowers
            ];

        }
        return inertia::render('Dashboard', $return);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
