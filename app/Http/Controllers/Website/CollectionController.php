<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $collections = Collection::latest()->get();

        return Inertia::render('website/collections/index', [
            'collections' => $collections,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Collection $collection)
    {
        return Inertia::render('website/collections/show', [
            'collection' => $collection,
        ]);
    }
} 