<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTemplateRequest;
use App\Http\Requests\Admin\UpdateTemplateRequest;
use App\Http\Resources\TemplateResource;
use App\Models\Template;
use App\Models\Category;
use App\Models\Collection;
use App\Models\TemplateType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $templates = Template::with(['category', 'collection', 'templateType'])->latest()->get();
        return Inertia::render('admin/templates/index', [
            'templates' => $templates,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::latest()->get();
        $collections = Collection::latest()->get();
        $templateTypes = TemplateType::latest()->get();
        return Inertia::render('admin/templates/create', [
            'categories' => $categories,
            'collections' => $collections,
            'templateTypes' => $templateTypes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTemplateRequest $request)
    {
        try {
            $data = $request->validated();
            
            // Handle file uploads
            if ($request->hasFile('file')) {
                $filePath = $request->file('file')->store('templates', 'public');
                $data['file_path'] = $filePath;
            }
            
            if ($request->hasFile('preview_image')) {
                $imagePath = $request->file('preview_image')->store('previews', 'public');
                $data['preview_image'] = $imagePath;
            }
            
            $template = Template::create($data);

            return redirect()->route('admin.templates.index')
                ->with('status', ['type' => 'success', 'message' => 'Template created successfully.']);
        } catch (\Exception $e) {
            return redirect()->route('admin.templates.index')
                ->with('status', ['type' => 'error', 'message' => 'Failed to create template.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Template $template)
    {
        $template->load(['category', 'collection', 'templateType']);
        $categories = Category::latest()->get();
        $collections = Collection::latest()->get();
        $templateTypes = TemplateType::latest()->get();
        
        return Inertia::render('admin/templates/show', [
            'template' => $template,
            'categories' => $categories,
            'collections' => $collections,
            'templateTypes' => $templateTypes,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Template $template)
    {
        $categories = Category::latest()->get();
        $collections = Collection::latest()->get();
        $templateTypes = TemplateType::latest()->get();
        $template->load(['category', 'collection', 'templateType']);
        return Inertia::render('admin/templates/edit', [
            'template' => $template,
            'categories' => $categories,
            'collections' => $collections,
            'templateTypes' => $templateTypes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTemplateRequest $request, Template $template)
    {
        try {
            $data = $request->validated();
            
            // Handle file uploads
            if ($request->hasFile('file')) {
                // Delete old file if exists
                if ($template->file_path) {
                    Storage::disk('public')->delete($template->file_path);
                }
                
                $filePath = $request->file('file')->store('templates', 'public');
                $data['file_path'] = $filePath;
            }
            
            if ($request->hasFile('preview_image')) {
                // Delete old image if exists
                if ($template->preview_image) {
                    Storage::disk('public')->delete($template->preview_image);
                }
                
                $imagePath = $request->file('preview_image')->store('previews', 'public');
                $data['preview_image'] = $imagePath;
            }
            
            $template->update($data);

            return redirect()->route('admin.templates.index')
                ->with('status', ['type' => 'success', 'message' => 'Template updated successfully.']);
        } catch (\Exception $e) {
            return redirect()->route('admin.templates.index')
                ->with('status', ['type' => 'error', 'message' => 'Failed to update template.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Template $template)
    {
        try {
            // Delete associated files
            if ($template->file_path) {
                Storage::disk('public')->delete($template->file_path);
            }
            
            if ($template->preview_image) {
                Storage::disk('public')->delete($template->preview_image);
            }
            
            $template->delete();

            return redirect()->route('admin.templates.index')
                ->with('status', ['type' => 'success', 'message' => 'Template deleted successfully.']);
        } catch (\Exception $e) {
            return redirect()->route('admin.templates.index')
                ->with('status', ['type' => 'error', 'message' => 'Failed to delete template.']);
        }
    }
}
