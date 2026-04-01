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
        $filter = $request->get('filter', 'all');
        $month  = $request->get('month', now()->format('Y-m'));

        $query = Order::with(['items', 'payments'])->latest();

        if ($month) {
            $query->whereYear('created_at', substr($month, 0, 4))
                  ->whereMonth('created_at', substr($month, 5, 2));
        }

        if ($filter === 'hutang') {
            $query->where('payment_status', 'hutang');
        } elseif ($filter === 'lunas') {
            $query->where('payment_status', 'lunas');
        }

        $orders = $query->get();

        // Single query for summary — group by payment_status
        $counts = Order::selectRaw("payment_status, COUNT(*) as count")
            ->groupBy('payment_status')
            ->pluck('count', 'payment_status');

        $summary = [
            'total'  => $counts->sum(),
            'hutang' => $counts->get('hutang', 0),
            'lunas'  => $counts->get('lunas', 0),
        ];

        return Inertia::render('Admin/Report/Index', [
            'orders'  => $orders,
            'filter'  => $filter,
            'month'   => $month,
            'summary' => $summary,
        ]);
    }
}
