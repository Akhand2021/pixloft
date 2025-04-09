<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\TemplateType;

class TemplateTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $templateTypes = TemplateType::latest()->get();
        return Inertia::render('admin/templates-types/index', [
            'templateTypes' => $templateTypes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/templates-types/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:template_types',
                'description' => 'nullable|string',
            ]);

            $templateType = TemplateType::create($request->only('name', 'description'));

            return redirect()->route('admin.templates-types.index')
                ->with('status', ['type' => 'success', 'message' => 'Template type created successfully.']);
        } catch (\Exception $e) {
            return redirect()->route('admin.templates-types.index')
                ->with('status', ['type' => 'error', 'message' => 'Failed to create template type.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $templateType = TemplateType::findOrFail($id);
        return Inertia::render('admin/templates-types/show', [
            'templateType' => $templateType,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $templateType = TemplateType::findOrFail($id);
        return Inertia::render('admin/templates-types/edit', [
            'templateType' => $templateType,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $templateType = TemplateType::findOrFail($id);
        $templateType->update($request->only('name', 'description'));
        return redirect()->route('admin.templates-types.index')
            ->with('status', ['type' => 'success', 'message' => 'Template type updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $templateType = TemplateType::findOrFail($id);
        $templateType->delete();
        return redirect()->route('admin.templates-types.index')
            ->with('status', ['type' => 'success', 'message' => 'Template type deleted successfully.']);
    }
}
