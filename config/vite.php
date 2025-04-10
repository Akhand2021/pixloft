<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Vite Base URL
    |--------------------------------------------------------------------------
    |
    | The base URL where Vite dev server will be accessible when running in
    | development mode. This is also used to generate URLs to your assets
    | when using the @vite directive in your Blade templates.
    |
    */

    'dev_url' => env('VITE_DEV_SERVER_URL', 'http://localhost:5173'),

    /*
    |--------------------------------------------------------------------------
    | Vite Manifest Path
    |--------------------------------------------------------------------------
    |
    | The path to the Vite manifest file relative to the public directory.
    | This is used to locate the manifest file when using the @vite
    | directive in your Blade templates.
    |
    */

    'manifest_path' => 'build/manifest.json',

    /*
    |--------------------------------------------------------------------------
    | Vite Config Path
    |--------------------------------------------------------------------------
    |
    | The path to your Vite configuration file relative to the project root.
    | This is used to locate the Vite configuration file when using the
    | @vite directive in your Blade templates.
    |
    */

    'config_path' => base_path('vite.config.ts'),
]; 