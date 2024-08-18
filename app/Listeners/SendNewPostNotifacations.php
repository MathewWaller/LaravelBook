<?php

namespace App\Listeners;

use App\Events\PostCreated;
use App\Models\User;
use App\Notifications\NewPost;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendNewPostNotifacations implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(PostCreated $event): void
    {
        // Notify All Users Other Than The User Making The Post
        foreach (User::where('id', $event->post->user_id)->cursor() as $user) {
            $user->notify(new NewPost($event->post));
        }
    }
}
