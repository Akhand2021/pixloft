<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('website/categories/index', [
            'categories' => $categories
        ]);
    }

    public function show(Category $category)
    {
        return Inertia::render('website/categories/show', [
            'category' => $category
        ]);
    }
}
