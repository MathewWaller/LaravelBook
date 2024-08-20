<?php

namespace App\Models;

use App\Events\PostCreated;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    use HasFactory;

    protected $table = "Posts";

    protected $fillable = ['message', 'audience'];

    protected $dispatchesEvents = [
        'created' => PostCreated::class,
        'view' => PostCreated::class,
    ];
 

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function like(): HasMany{
        return $this->hasMany(likes::class);
    }
}
