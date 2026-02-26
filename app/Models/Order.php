<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'invoice_number',
        'customer_name',
        'institution',
        'phone',
        'email',
        'address',
        'subtotal',
        'discount_percent',
        'shipping_cost',
        'status',
        'payment_status',
        'notes',
    ];

    protected $casts = [
        'subtotal' => 'integer',
        'discount_percent' => 'integer',
        'shipping_cost' => 'integer',
    ];

    protected $appends = ['grand_total', 'total_paid', 'sisa_tagihan'];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function getGrandTotalAttribute(): int
    {
        $discount = (int) round($this->subtotal * ($this->discount_percent / 100));
        return $this->subtotal - $discount + $this->shipping_cost;
    }

    public function getTotalPaidAttribute(): int
    {
        return (int) $this->payments()->sum('amount');
    }

    public function getSisaTagihanAttribute(): int
    {
        return max(0, $this->grand_total - $this->total_paid);
    }

    public static function generateInvoiceNumber(): string
    {
        $date = now()->format('Ymd');
        $lastOrder = static::where('invoice_number', 'like', "INV-{$date}-%")
            ->orderBy('invoice_number', 'desc')
            ->first();

        if ($lastOrder) {
            $lastNumber = (int) substr($lastOrder->invoice_number, -4);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }

        return "INV-{$date}-" . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
    }
}
