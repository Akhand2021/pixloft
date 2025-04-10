<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class CollectionSeeder extends Seeder
{
    public function run()
    {
        $collections = [
            'Freshers Resume Pack',
            'Freelancer Starter Kit',
            'Startup Investor Kit',
            'Real Estate Business Pack',
            'Digital Creator Tools',
            'Corporate Branding Kit',
            'Content Creator Bundle',
            'Consulting Documents Pack',
            'Medical Professional Templates',
            'Small Business Launch Kit'
        ];

        foreach ($collections as $name) {
            DB::table('collections')->insert(['name' => $name,
            'slug' => Str::slug($name),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        }
    }
}
