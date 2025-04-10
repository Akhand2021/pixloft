<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\TemplateType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $templateTypes = TemplateType::latest()->get();
        
        return Inertia::render('website/templates-types/index', [
            'templateTypes' => $templateTypes,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(TemplateType $templateType)
    {
        $templateType->load(['templates']);
        
        return Inertia::render('website/templates-types/show', [
            'templateType' => $templateType,
        ]);
    }
} 