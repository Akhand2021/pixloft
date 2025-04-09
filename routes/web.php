<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CollectionController;
use App\Http\Controllers\Admin\TemplateController;
use App\Http\Controllers\Admin\OrderController;
// use App\Http\Controllers\Admin\DownloadController;
use App\Http\Controllers\Admin\TemplateTypeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('categories', [CategoryController::class, 'index'])->name('categories');

    // Public collection routes
    Route::get('collections', [CollectionController::class, 'index'])->name('collections');

    Route::get('templates', [TemplateController::class, 'index'])->name('templates');

    Route::get('orders', [OrderController::class, 'index'])->name('orders');

    Route::get('templates-types', [TemplateTypeController::class, 'index'])->name('templates-types');

    // Route::get('downloads', [DownloadController::class, 'index'])->name('downloads');
    
    // Admin routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('categories', CategoryController::class);
        Route::resource('collections', CollectionController::class);
        Route::resource('templates', TemplateController::class);
        Route::resource('templates-types', TemplateTypeController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
