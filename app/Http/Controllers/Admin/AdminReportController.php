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
        $month = $request->get('month', now()->format('Y-m'));

        $query = Order::withCount('payments')
            ->withSum('payments', 'amount')
            ->latest();

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

        // Select only needed columns
        $orders = $query->select([
            'id', 'invoice_number', 'customer_name', 'institution',
            'grand_total', 'status', 'payment_status', 'created_at',
            'discount_percent', 'shipping_cost'
        ])->get();

        // Single query for summary counts
        $summary = Order::selectRaw("
            COUNT(*) as total,
            COUNT(CASE WHEN payment_status = 'hutang' THEN 1 END) as hutang,
            COUNT(CASE WHEN payment_status = 'lunas' THEN 1 END) as lunas
        ")->first();

        return Inertia::render('Admin/Report/Index', [
            'orders' => $orders,
            'filter' => $filter,
            'month' => $month,
            'summary' => $summary,
        ]);
    }
}
