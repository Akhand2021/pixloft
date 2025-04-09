<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCollectionRequest;
use App\Http\Requests\Admin\UpdateCollectionRequest;
use App\Http\Resources\CollectionResource;
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

        return Inertia::render('admin/collections/index', [
            'collections' => $collections,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/collections/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCollectionRequest $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:collections',
                'description' => 'nullable|string',
            ]);

            $collection = Collection::create($request->only('name', 'description'));

            return redirect()->route('collections')
                ->with('status', ['type' => 'success', 'message' => 'Collection created successfully.']);
        } catch (\Exception $e) {
            return redirect()->route('collections')
                ->with('status', ['type' => 'error', 'message' => 'Failed to create collection.']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Collection $collection)
    {
        return Inertia::render('admin/collections/show', [
            'collection' => $collection,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Collection $collection)
    {
        return Inertia::render('admin/collections/edit', [
            'collection' => $collection,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCollectionRequest $request, Collection $collection)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255|unique:collections,name,' . $collection->id,
                'description' => 'nullable|string',
            ]);

            $collection->update($request->only('name', 'description'));

            return redirect()->route('collections')
                ->with('status', ['type' => 'success', 'message' => 'Collection updated successfully.']);
        } catch (\Exception $e) {
            return redirect()->route('collections')
                ->with('status', ['type' => 'error', 'message' => 'Failed to update collection.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Collection $collection)
    {
        $collection->delete();

        return redirect()->route('admin.collections.index')
            ->with('success', 'Collection deleted successfully.');
    }
}
