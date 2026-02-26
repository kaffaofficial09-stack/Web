<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Intervention\Image\Laravel\Facades\Image;
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
            'image' => 'nullable|image|max:5120',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $this->processImage($request->file('image'), 'portfolios');
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
            'image' => 'nullable|image|max:5120',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($portfolio->image) {
                $oldFile = public_path(ltrim($portfolio->image, '/'));
                if (File::exists($oldFile)) {
                    File::delete($oldFile);
                }
            }
            $data['image'] = $this->processImage($request->file('image'), 'portfolios');
        }

        $data['is_published'] = $request->boolean('is_published', true);

        $portfolio->update($data);

        return redirect()->route('admin.portfolios.index')->with('success', 'Portofolio berhasil diperbarui.');
    }

    public function destroy(Portfolio $portfolio)
    {
        if ($portfolio->image) {
            $oldFile = public_path(ltrim($portfolio->image, '/'));
            if (File::exists($oldFile)) {
                File::delete($oldFile);
            }
        }

        $portfolio->delete();

        return redirect()->route('admin.portfolios.index')->with('success', 'Portofolio berhasil dihapus.');
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
