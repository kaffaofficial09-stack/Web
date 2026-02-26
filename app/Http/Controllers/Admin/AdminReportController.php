<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminReportController extends Controller
{
    public function index(Request $request)
    {
        $filter = $request->get('filter', 'all'); // all, hutang, lunas
        $month = $request->get('month', now()->format('Y-m')); // YYYY-MM

        $query = Order::with('items', 'payments')->latest();

        // Filter by month
        if ($month) {
            $query->whereYear('created_at', substr($month, 0, 4))
                ->whereMonth('created_at', substr($month, 5, 2));
        }

        // Filter by payment status
        if ($filter === 'hutang') {
            $query->where('payment_status', 'hutang');
        } elseif ($filter === 'lunas') {
            $query->where('payment_status', 'lunas');
        }

        $orders = $query->get();

        $summary = [
            'total' => Order::count(),
            'hutang' => Order::where('payment_status', 'hutang')->count(),
            'lunas' => Order::where('payment_status', 'lunas')->count(),
        ];

        return Inertia::render('Admin/Report/Index', [
            'orders' => $orders,
            'filter' => $filter,
            'month' => $month,
            'summary' => $summary,
        ]);
    }
}
