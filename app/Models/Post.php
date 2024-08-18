<?php

namespace App\Models;

use App\Events\PostCreated;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $table = "Posts";

    protected $fillable = ['message', 'audience'];

    protected $dispatchesEvents = [
        'created' => PostCreated::class,
    ];
 

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
