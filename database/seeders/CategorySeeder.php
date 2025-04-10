<?php

namespace Database\Seeders;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            'Resumes & CVs', 'Business Documents', 'Marketing Materials',
            'Presentations & Pitch Decks', 'Agreements & Contracts',
            'Social Media Kits', 'Startup Kits', 'Personal Branding',
            'Design & UI Kits', 'Education & Academic'
        ];

        foreach ($categories as $name) {
            DB::table('categories')->insert([
                'name' => $name,
                'slug' => Str::slug($name),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
