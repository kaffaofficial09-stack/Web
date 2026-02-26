<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Insight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Intervention\Image\Laravel\Facades\Image;
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
            'image' => 'nullable|image|max:5120',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $this->processImage($request->file('image'), 'insights');
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
            'image' => 'nullable|image|max:5120',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($insight->image) {
                $oldFile = public_path(ltrim($insight->image, '/'));
                if (File::exists($oldFile)) {
                    File::delete($oldFile);
                }
            }
            $data['image'] = $this->processImage($request->file('image'), 'insights');
        }

        $data['is_published'] = $request->boolean('is_published', true);

        $insight->update($data);

        return redirect()->route('admin.insights.index')->with('success', 'Insight berhasil diperbarui.');
    }

    public function destroy(Insight $insight)
    {
        if ($insight->image) {
            $oldFile = public_path(ltrim($insight->image, '/'));
            if (File::exists($oldFile)) {
                File::delete($oldFile);
            }
        }

        $insight->delete();

        return redirect()->route('admin.insights.index')->with('success', 'Insight berhasil dihapus.');
    }

    /**
     * Resize & compress image, save directly to public/img/uploads/{folder}.
     */
    private function processImage($file, string $folder): string
    {
        $filename = uniqid() . '.jpg';
        $dir = public_path("img/uploads/{$folder}");

        if (!File::isDirectory($dir)) {
            File::makeDirectory($dir, 0755, true);
        }

        $img = Image::read($file->getPathname());
        $img->scaleDown(width: 1200);
        $encoded = $img->toJpeg(quality: 85);

        file_put_contents("{$dir}/{$filename}", (string) $encoded);

        return "/img/uploads/{$folder}/{$filename}";
    }
}
