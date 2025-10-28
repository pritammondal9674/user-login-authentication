<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role  // role passed from route
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        Log::info('CheckRole middleware triggered for role: ' . $role);
    
        if (! $request->user() || $request->user()->role !== $role) {
            Log::warning('Access denied for user. Expected role: ' . $role);
            abort(403, 'Unauthorized');
        }
    
        Log::info('Access granted to user: ' . $request->user()->name);
        return $next($request);
    }
}
