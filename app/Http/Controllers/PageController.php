<?php

namespace App\Http\Controllers;

use App\Models\Insight;
use App\Models\Portfolio;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function beranda(): Response
    {
        return Inertia::render('Beranda');
    }

    public function programPelatihan(): Response
    {
        return Inertia::render('ProgramPelatihan');
    }

    public function bukuModul(): Response
    {
        return Inertia::render('BukuModul');
    }

    public function portofolio(): Response
    {
        $portfolios = Portfolio::published()->latest()->get();
        return Inertia::render('Portofolio', ['portfolios' => $portfolios]);
    }

    public function insight(): Response
    {
        $insights = Insight::published()->latest()->get();
        return Inertia::render('Insight', ['insights' => $insights]);
    }

    public function tentangKami(): Response
    {
        return Inertia::render('TentangKami');
    }

    public function kontak(): Response
    {
        return Inertia::render('Kontak');
    }
}
