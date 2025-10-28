<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Middleware\CheckRole;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;


Route::post('/auth/login', [AuthController::class, 'login'])
	->middleware('guest')
	->name('auth.login');

/*
|--------------------------------------------------------------------------
| Protected Routes (Authenticated)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth'])->group(function () 
{
	// ✅ Posts CRUD routes
	Route::resource('posts', PostController::class);

	Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');
	Route::put('/comments/{comment}', [CommentController::class, 'update'])->name('comments.update');
	Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

	// ✅ User dashboard
	Route::get('/user-dashboard', fn () => Inertia::render('UserDashboard'))
		->name('user-dashboard');

	// ✅ Admin routes
	Route::middleware([CheckRole::class . ':admin'])->group(function () {
		Route::get('/admin-dashboard', fn () => Inertia::render('AdminDashboard'))
			->name('admin-dashboard');

		Route::get('/admin/users', fn () => Inertia::render('AdminUsers'))
			->name('admin-users');

		Route::get('/admin/posts', fn () => Inertia::render('AdminPosts'))
			->name('admin-posts');
	});
});

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/', function () 
{
	return Inertia::render('welcome', [
		'canRegister' => Features::enabled(Features::registration()),
	]);
})->name('home');

Route::get('/login', fn () => Inertia::render('UserLogin'))->name('login');
Route::get('/register', fn () => Inertia::render('UserRegister'))->name('register');

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/
Route::post('/auth/logout', function () 
{
	auth()->logout();
	request()->session()->invalidate();
	request()->session()->regenerateToken();
	return redirect()->route('login');
})->middleware(['web', 'auth'])->name('auth.logout');

require __DIR__.'/settings.php';
