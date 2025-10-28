<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use Illuminate\Support\Str;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $roles = ['Admin', 'Regular User'];

        foreach ($roles as $role) {
            \App\Models\Role::firstOrCreate([
                'name' => $role,
                'slug' => Str::slug($role), // convert 'Admin' -> 'admin'
            ]);
        }
    }
}
