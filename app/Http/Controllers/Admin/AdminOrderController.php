<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::withSum('payments', 'amount')
            ->select([
                'id', 'invoice_number', 'customer_name', 'institution',
                'subtotal', 'discount_percent', 'shipping_cost',
                'status', 'payment_status', 'created_at',
            ])
            ->latest();

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%")
                    ->orWhere('institution', 'like', "%{$search}%");
            });
        }

        $orders = $query->get();

        // Single query for all status counts using groupBy
        $rawCounts = Order::selectRaw("status, COUNT(*) as count")
            ->groupBy('status')
            ->pluck('count', 'status');

        $statusCounts = [
            'pending'   => $rawCounts->get('pending', 0),
            'confirmed' => $rawCounts->get('confirmed', 0),
            'shipped'   => $rawCounts->get('shipped', 0),
            'completed' => $rawCounts->get('completed', 0),
            'cancelled' => $rawCounts->get('cancelled', 0),
        ];

        return Inertia::render('Admin/Order/Index', [
            'orders'       => $orders,
            'statusCounts' => $statusCounts,
        ]);
    }

    public function show(Order $order)
    {
        $order->load('items', 'payments');

        return Inertia::render('Admin/Order/Show', [
            'order' => $order,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $data = $request->validate([
            'status'           => 'required|in:pending,confirmed,shipped,completed,cancelled',
            'notes'            => 'nullable|string',
            'discount_percent' => 'nullable|integer|min:0|max:100',
            'shipping_cost'    => 'nullable|numeric|min:0',
        ]);

        $order->update($data);

        return redirect()->route('admin.orders.show', $order)
            ->with('success', 'Pesanan berhasil diperbarui.');
    }

    public function storePayment(Request $request, Order $order)
    {
        $data = $request->validate([
            'method' => 'required|string|max:100',
            'amount' => 'required|integer|min:1',
        ]);

        $order->payments()->create($data);

        // Auto-update payment_status using eager-loaded sum
        $order->load('payments');
        if ($order->sisa_tagihan <= 0) {
            $order->update(['payment_status' => 'lunas']);
        }

        return redirect()->route('admin.orders.show', $order)
            ->with('success', 'Pembayaran berhasil dicatat.');
    }

    public function destroyPayment(Payment $payment)
    {
        $order = $payment->order;
        $payment->delete();

        // Recalculate payment_status using eager load
        $order->load('payments');
        $order->update([
            'payment_status' => $order->sisa_tagihan <= 0 ? 'lunas' : 'hutang',
        ]);

        return redirect()->route('admin.orders.show', $order)
            ->with('success', 'Pembayaran berhasil dihapus.');
    }
}
