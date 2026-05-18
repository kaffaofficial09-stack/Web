<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add indexes to orders table for frequently queried columns
        Schema::table('orders', function (Blueprint $table) {
            // Use Schema::hasIndex() — available since Laravel 11+ (Doctrine removed in Laravel 13)
            if (!Schema::hasIndex('orders', 'orders_status_index')) {
                $table->index('status');
            }
            if (!Schema::hasIndex('orders', 'orders_payment_status_index')) {
                $table->index('payment_status');
            }
            if (!Schema::hasIndex('orders', 'orders_created_at_index')) {
                $table->index('created_at');
            }
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndexIfExists('orders_status_index');
            $table->dropIndexIfExists('orders_payment_status_index');
            $table->dropIndexIfExists('orders_created_at_index');
        });
    }
};
