<?php

namespace App\Policies;

use App\Models\User;
use App\Models\likes;
use App\Models\Post;

use Illuminate\Auth\Access\Response;

class LikesPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, likes $likes): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, likes $likes, $id): bool
    {
        $like = $user->like()->where("post_id", $id)->count();
        return ($like > 0) ? false : true;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, likes $likes): bool
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, likes $likes): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, likes $likes): bool
    {
        //
    }
}
