<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\Template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $templates = Template::with(['category', 'collection', 'templateType'])->latest()->get();
        return Inertia::render('website/templates/index', [
            'templates' => $templates,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Template $template)
    {
        $template->load(['category', 'collection', 'templateType']);
        
        return Inertia::render('website/templates/show', [
            'template' => $template,
        ]);
    }
} 