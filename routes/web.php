<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\AdminInsightController;
use App\Http\Controllers\Admin\AdminPortfolioController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [PageController::class, 'beranda'])->name('beranda');
Route::get('/program-pelatihan', [PageController::class, 'programPelatihan'])->name('program-pelatihan');
Route::get('/buku-modul', [PageController::class, 'bukuModul'])->name('buku-modul');
Route::get('/portofolio', [PageController::class, 'portofolio'])->name('portofolio');
Route::get('/insight', [PageController::class, 'insight'])->name('insight');
Route::get('/tentang-kami', [PageController::class, 'tentangKami'])->name('tentang-kami');
Route::get('/kontak', [PageController::class, 'kontak'])->name('kontak');

// Admin auth
Route::get('/admin/login', [AdminController::class, 'loginForm'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login']);
Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

// Admin panel (auth required)
Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

    Route::resource('insights', AdminInsightController::class)->except(['show']);
    Route::resource('portfolios', AdminPortfolioController::class)->except(['show']);
});
