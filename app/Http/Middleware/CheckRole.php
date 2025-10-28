<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CheckRole
{
    public function handle(Request $request, Closure $next, $role)
    {
        Log::info('CheckRole middleware triggered for user ID: ' . Auth::id());

        $user = Auth::user();

        if (!$user) {
            Log::warning('Unauthenticated user tried to access a role-protected route.');
            return redirect('/login');
        }

        // Check if the user has roles relation (adjust if your model uses a different name)
        $userRoles = $user->roles()->pluck('slug')->toArray();
        Log::info('User roles: ' . json_encode($userRoles));

        // Verify role match
        if (!in_array($role, $userRoles)) {
            Log::warning("Access denied for user {$user->id}. Required role: {$role}");
            abort(403, 'Unauthorized – you do not have permission to access this page.');
        }

        Log::info("Access granted for user {$user->id} with role {$role}");
        return $next($request);
    }
}
