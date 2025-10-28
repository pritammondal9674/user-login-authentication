<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Middleware\CheckRole; // ← import FQCN
use App\Http\Controllers\AuthController;

Route::post('/auth/login', [AuthController::class, 'login'])
    ->middleware('guest')
    ->name('auth.login');


/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/login', function () {
    Log::info('Login page hit');
    return Inertia::render('UserLogin');
})->name('login');

Route::get('/register', fn () => Inertia::render('UserRegister'))->name('register');
Route::get('/posts', fn () => Inertia::render('Posts'));
Route::get('/test', fn () => 'Laravel is working!');

// Route::post('/logout', function () {
//     auth()->logout();
//     return redirect()->route('login');
// })->name('logout');


Route::post('/auth/logout', function () {
    auth()->logout();
    request()->session()->invalidate();
    request()->session()->regenerateToken();
    return redirect()->route('login'); // 302 is expected here
})->middleware(['web','auth'])->name('auth.logout');

// Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
//     ->middleware(['auth'])
//     ->name('logout');

// Route::post('/logout', function (Request $request) {
//     Auth::guard('web')->logout();
//     $request->session()->invalidate();
//     $request->session()->regenerateToken();

//     return response()->json(['message' => 'Logged out successfully']);
// })->middleware('web');



/*
|--------------------------------------------------------------------------
| Admin (protected)
|--------------------------------------------------------------------------
*/
Route::get('/admin', fn () => 'Welcome, Admin!')
    ->middleware([
        'auth',
        'verified',
        CheckRole::class . ':admin', // ← FQCN, bypasses alias entirely
    ])
    ->name('admin');

/*
|--------------------------------------------------------------------------
| Authenticated routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/user-dashboard', fn () => Inertia::render('UserDashboard'))
        ->name('user-dashboard');
});

/*
|--------------------------------------------------------------------------
| Admin group
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified', CheckRole::class . ':admin'])->group(function () {
    Route::get('/admin-dashboard', fn () => Inertia::render('AdminDashboard'))
        ->name('admin-dashboard');

    Route::get('/admin/users', fn () => Inertia::render('AdminUsers'))
        ->name('admin-users');

    Route::get('/admin/posts', fn () => Inertia::render('AdminPosts'))
        ->name('admin-posts');
});

require __DIR__.'/settings.php';
