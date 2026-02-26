<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\AdminInsightController;
use App\Http\Controllers\Admin\AdminPortfolioController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminReportController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [PageController::class, 'beranda'])->name('beranda');
Route::get('/program-pelatihan', [PageController::class, 'programPelatihan'])->name('program-pelatihan');
Route::get('/buku-modul', [PageController::class, 'bukuModul'])->name('buku-modul');
Route::get('/portofolio', [PageController::class, 'portofolio'])->name('portofolio');
Route::get('/portofolio/{portfolio}', [PageController::class, 'portfolioDetail'])->name('portofolio.detail');
Route::get('/insight', [PageController::class, 'insight'])->name('insight');
Route::get('/insight/{insight}', [PageController::class, 'insightDetail'])->name('insight.detail');
Route::get('/tentang-kami', [PageController::class, 'tentangKami'])->name('tentang-kami');
Route::get('/kontak', [PageController::class, 'kontak'])->name('kontak');

// Checkout (redirects to WhatsApp)
Route::post('/checkout', [OrderController::class, 'store'])->name('checkout')->middleware('throttle:10,1');

// Admin auth
Route::get('/admin/login', [AdminController::class, 'loginForm'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login'])->middleware('throttle:5,1');
Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

// Admin panel (auth required)
Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

    Route::resource('insights', AdminInsightController::class)->except(['show']);
    Route::resource('portfolios', AdminPortfolioController::class)->except(['show']);
    Route::resource('orders', AdminOrderController::class)->only(['index', 'show']);
    Route::patch('orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('orders.status');
    Route::post('orders/{order}/payments', [AdminOrderController::class, 'storePayment'])->name('orders.payments');
    Route::get('invoice/{order:invoice_number}', [OrderController::class, 'show'])->name('invoice.show');
    Route::get('reports', [AdminReportController::class, 'index'])->name('reports.index');
});
