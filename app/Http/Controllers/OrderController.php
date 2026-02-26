<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'customer_name' => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email|max:255',
            'address' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.product_name' => 'required|string|max:255',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $order = DB::transaction(function () use ($data) {
            $subtotal = collect($data['items'])->sum(fn($item) => $item['price'] * $item['quantity']);

            // Auto-calculate shipping: Rp 30.000 per Rp 2.000.000
            $shippingCost = $subtotal > 0 ? (int) ceil($subtotal / 2000000) * 30000 : 0;

            $order = Order::create([
                'invoice_number' => Order::generateInvoiceNumber(),
                'customer_name' => $data['customer_name'],
                'institution' => $data['institution'],
                'phone' => $data['phone'],
                'email' => $data['email'] ?? null,
                'address' => $data['address'],
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
            ]);

            foreach ($data['items'] as $item) {
                $order->items()->create([
                    'product_name' => $item['product_name'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                ]);
            }

            return $order;
        });

        // Build WhatsApp message with order summary
        $itemsList = collect($data['items'])->map(function ($item) {
            return "• {$item['product_name']} x{$item['quantity']} = Rp " . number_format($item['price'] * $item['quantity'], 0, ',', '.');
        })->join("\n");

        $subtotal = $order->subtotal;
        $waMessage = "Assalamu'alaikum, saya ingin konfirmasi pesanan:\n\n"
            . "📋 *Invoice: {$order->invoice_number}*\n"
            . "👤 Nama: {$order->customer_name}\n"
            . "🏫 Lembaga: {$order->institution}\n"
            . "📱 No HP: {$order->phone}\n"
            . "📍 Alamat: {$order->address}\n\n"
            . "🛒 *Item Pesanan:*\n{$itemsList}\n\n"
            . "💰 Subtotal: Rp " . number_format($subtotal, 0, ',', '.') . "\n\n"
            . "Mohon konfirmasi dan info selanjutnya. Terima kasih! 🙏";

        $waNumber = '6281220745064';
        $waUrl = 'https://wa.me/' . $waNumber . '?text=' . urlencode($waMessage);

        return Inertia::location($waUrl);
    }

    public function show(Order $order)
    {
        $order->load('items');

        return Inertia::render('Invoice', [
            'order' => $order,
        ]);
    }
}
