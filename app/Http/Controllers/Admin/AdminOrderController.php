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
        $query = Order::withCount('payments')->latest();

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%")
                    ->orWhere('institution', 'like', "%{$search}%");
            });
        }

        // Only select fields needed for the list view (not all columns)
        $orders = $query->select([
            'id', 'invoice_number', 'customer_name', 'institution',
            'grand_total', 'status', 'payment_status', 'created_at'
        ])->get();

        // Use a single optimized query for status counts
        $statusCounts = Order::selectRaw("
            COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
            COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed,
            COUNT(CASE WHEN status = 'shipped' THEN 1 END) as shipped,
            COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
            COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled
        ")->first();

        return Inertia::render('Admin/Order/Index', [
            'orders' => $orders,
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
            'status' => 'required|in:pending,confirmed,shipped,completed,cancelled',
            'notes' => 'nullable|string',
            'discount_percent' => 'nullable|integer|min:0|max:100',
            'shipping_cost' => 'nullable|numeric|min:0',
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

        // Auto-update payment_status
        $order->refresh();
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

        // Recalculate payment_status
        $order->refresh();
        $order->update([
            'payment_status' => $order->sisa_tagihan <= 0 ? 'lunas' : 'hutang',
        ]);

        return redirect()->route('admin.orders.show', $order)
            ->with('success', 'Pembayaran berhasil dihapus.');
    }
}
