<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('role_user', function (Blueprint $table) {
            if (!Schema::hasColumn('role_user', 'user_id')) {
                $table->unsignedBigInteger('user_id')->after('id');
            }

            if (!Schema::hasColumn('role_user', 'role_id')) {
                $table->unsignedBigInteger('role_id')->after('user_id');
            }
        });

        // Add missing foreign key for role_id manually (if not exists)
        $foreignKeys = DB::select("SHOW CREATE TABLE role_user");
        $foreignSql = $foreignKeys[0]->{'Create Table'} ?? '';

        if (!str_contains($foreignSql, 'role_user_role_id_foreign')) {
            DB::statement('ALTER TABLE role_user ADD CONSTRAINT role_user_role_id_foreign FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE;');
        }
    }

    public function down(): void
    {
        Schema::table('role_user', function (Blueprint $table) {
            if (Schema::hasColumn('role_user', 'role_id')) {
                $table->dropForeign(['role_id']);
                $table->dropColumn('role_id');
            }
        });
    }
};
