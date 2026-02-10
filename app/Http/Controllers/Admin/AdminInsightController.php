<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Insight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminInsightController extends Controller
{
    public function index()
    {
        $insights = Insight::latest()->get();
        return Inertia::render('Admin/Insight/Index', ['insights' => $insights]);
    }

    public function create()
    {
        return Inertia::render('Admin/Insight/Form');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = '/storage/' . $request->file('image')->store('insights', 'public');
        }

        $data['is_published'] = $request->boolean('is_published', true);

        Insight::create($data);

        return redirect()->route('admin.insights.index')->with('success', 'Insight berhasil ditambahkan.');
    }

    public function edit(Insight $insight)
    {
        return Inertia::render('Admin/Insight/Form', ['insight' => $insight]);
    }

    public function update(Request $request, Insight $insight)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($insight->image) {
                $oldPath = str_replace('/storage/', '', $insight->image);
                Storage::disk('public')->delete($oldPath);
            }
            $data['image'] = '/storage/' . $request->file('image')->store('insights', 'public');
        }

        $data['is_published'] = $request->boolean('is_published', true);

        $insight->update($data);

        return redirect()->route('admin.insights.index')->with('success', 'Insight berhasil diperbarui.');
    }

    public function destroy(Insight $insight)
    {
        if ($insight->image) {
            $oldPath = str_replace('/storage/', '', $insight->image);
            Storage::disk('public')->delete($oldPath);
        }

        $insight->delete();

        return redirect()->route('admin.insights.index')->with('success', 'Insight berhasil dihapus.');
    }
}
