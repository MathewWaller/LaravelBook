<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class likes extends Model
{
    use HasFactory;

    protected $table = "Likes";

    protected $fillable = ['post_id', 'author_id', 'user_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function Post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
