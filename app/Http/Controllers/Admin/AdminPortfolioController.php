<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminPortfolioController extends Controller
{
    public function index()
    {
        $portfolios = Portfolio::latest()->get();
        return Inertia::render('Admin/Portfolio/Index', ['portfolios' => $portfolios]);
    }

    public function create()
    {
        return Inertia::render('Admin/Portfolio/Form');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = '/storage/' . $request->file('image')->store('portfolios', 'public');
        }

        $data['is_published'] = $request->boolean('is_published', true);

        Portfolio::create($data);

        return redirect()->route('admin.portfolios.index')->with('success', 'Portofolio berhasil ditambahkan.');
    }

    public function edit(Portfolio $portfolio)
    {
        return Inertia::render('Admin/Portfolio/Form', ['portfolio' => $portfolio]);
    }

    public function update(Request $request, Portfolio $portfolio)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($portfolio->image) {
                $oldPath = str_replace('/storage/', '', $portfolio->image);
                Storage::disk('public')->delete($oldPath);
            }
            $data['image'] = '/storage/' . $request->file('image')->store('portfolios', 'public');
        }

        $data['is_published'] = $request->boolean('is_published', true);

        $portfolio->update($data);

        return redirect()->route('admin.portfolios.index')->with('success', 'Portofolio berhasil diperbarui.');
    }

    public function destroy(Portfolio $portfolio)
    {
        if ($portfolio->image) {
            $oldPath = str_replace('/storage/', '', $portfolio->image);
            Storage::disk('public')->delete($oldPath);
        }

        $portfolio->delete();

        return redirect()->route('admin.portfolios.index')->with('success', 'Portofolio berhasil dihapus.');
    }
}
