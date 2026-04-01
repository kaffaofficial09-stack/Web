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
            // Check if index already exists before adding
            $sm = Schema::getConnection()->getDoctrineSchemaManager();
            $indexes = array_keys($sm->listTableIndexes('orders'));

            if (!in_array('orders_status_index', $indexes)) {
                $table->index('status');
            }
            if (!in_array('orders_payment_status_index', $indexes)) {
                $table->index('payment_status');
            }
            if (!in_array('orders_created_at_index', $indexes)) {
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
