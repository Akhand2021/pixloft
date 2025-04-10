<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\CategorySeeder;
use Database\Seeders\CollectionSeeder;
use Database\Seeders\TemplateTypeSeeder;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Akhand Singh',
            'email' => 'aps@yopmail.com',
            'password' => Hash::make('password'),
        ]);

        $this->call([
            CategorySeeder::class,
            CollectionSeeder::class,
            TemplateTypeSeeder::class,
        ]);
    }
}
