<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = Category::latest()->get();
        
        return Inertia::render('admin/categories/index', [
            'categories' => $categories,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255|unique:categories',
            ]);

            if ($validator->fails()) {
                return redirect()->back()
                    ->with('status', ['type' => 'error', 'message' => 'Validation failed.'])
                    ->withErrors($validator)
                    ->withInput();
            }

            Category::create($request->all());

            return redirect()->route('admin.categories.index')
                ->with('status', ['type' => 'success', 'message' => 'Category created successfully.']);
        } catch (\Exception $e) {
            return redirect()->route('admin.categories.index')
                ->with('status', ['type' => 'error', 'message' => 'Failed to create category.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return Inertia::render('admin/categories/show', [
            'category' => $category,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('admin/categories/edit', [
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            ]);

            if ($validator->fails()) {
                return redirect()->back()
                    ->with('status', ['type' => 'error', 'message' => 'Validation failed.'])
                    ->withErrors($validator)
                    ->withInput();
            }

            $category->update($request->all());

            return redirect()->route('admin.categories.index')
                ->with('status', ['type' => 'success', 'message' => 'Category updated successfully.']);
        } catch (\Exception $e) {
            return redirect()->route('admin.categories.index')
                ->with('status', ['type' => 'error', 'message' => 'Failed to update category.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try {
            $category->delete();

            return redirect()->route('admin.categories.index')
                ->with('status', ['type' => 'success', 'message' => 'Category deleted successfully.']);
        } catch (\Exception $e) {
            return redirect()->route('admin.categories.index')
                ->with('status', ['type' => 'error', 'message' => 'Failed to delete category.']);
        }
    }
}
