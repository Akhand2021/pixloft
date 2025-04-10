<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CollectionController;
use App\Http\Controllers\Admin\TemplateController;
use App\Http\Controllers\Admin\OrderController;
// use App\Http\Controllers\Admin\DownloadController;
use App\Http\Controllers\Admin\TemplateTypeController;
use App\Http\Controllers\Website\CollectionController as WebsiteCollectionController;
use App\Http\Controllers\Website\TemplateController as WebsiteTemplateController;
use App\Http\Controllers\Website\OrderController as WebsiteOrderController;
use App\Http\Controllers\Website\TemplateTypeController as WebsiteTemplateTypeController;
use App\Http\Controllers\Website\CategoryController as WebsiteCategoryController;
use App\Http\Controllers\Website\DashboardController as WebsiteDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Website routes (public)
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Website routes (authenticated)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [WebsiteDashboardController::class, 'index'])->name('dashboard');

    // Website public routes
    Route::get('collections', [WebsiteCollectionController::class, 'index'])->name('collections');
    Route::get('collections/{collection}', [WebsiteCollectionController::class, 'show'])->name('collections.show');
    
    Route::get('templates', [WebsiteTemplateController::class, 'index'])->name('templates');
    Route::get('templates/{template}', [WebsiteTemplateController::class, 'show'])->name('templates.show');

    Route::get('categories', [WebsiteCategoryController::class, 'index'])->name('categories');
    Route::get('categories/{category}', [WebsiteCategoryController::class, 'show'])->name('categories.show');
    
    Route::get('orders', [WebsiteOrderController::class, 'index'])->name('orders');
    Route::get('orders/{order}', [WebsiteOrderController::class, 'show'])->name('orders.show');
    
    Route::get('templates-types', [WebsiteTemplateTypeController::class, 'index'])->name('templates-types');
    Route::get('templates-types/{templateType}', [WebsiteTemplateTypeController::class, 'show'])->name('templates-types.show');
});

// Admin routes (authenticated)
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Admin dashboard
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');
    
    // Admin resource routes
    Route::resource('categories', CategoryController::class);
    Route::resource('collections', CollectionController::class);
    Route::resource('templates', TemplateController::class);
    Route::resource('templates-types', TemplateTypeController::class);
    Route::resource('orders', OrderController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
