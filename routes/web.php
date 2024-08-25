<?php

use App\Http\Controllers\FollowerController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/view/profile/{user_id?}', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/like', [LikesController::class, 'store'])->name('likes.store');
    Route::post('/like/delete', [LikesController::class, 'destroy'])->name('likes.destroy');
    Route::post('/follow', [FollowerController::class, 'store'])->name('follow.store');
    Route::post('/follow/remove', [FollowerController::class, 'destroy'])->name('follow.destroy');
});

Route::resource('posts', PostController::class)
    ->only(['index','accessdenied', 'store', 'update', 'destroy',])
    ->middleware(['auth', 'verified']);



Route::get('/post/{id}', [PostController::class, 'show']);

require __DIR__.'/auth.php';
