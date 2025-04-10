<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class TemplateTypeSeeder extends Seeder
{
    public function run()
    {
        $templateTypes = [
            'Word Document (.docx)',
            'Google Docs Template',
            'PDF Editable',
            'PowerPoint (.pptx)',
            'Figma UI Kit',
            'Canva Template',
            'Excel Spreadsheet',
            'Invoice Generator Template',
            'Proposal Format (Editable)',
            'Resume Builder Template'
        ];

        foreach ($templateTypes as $type) {
            DB::table('template_types')->insert(['name' => $type,
            'slug' => Str::slug($type),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        }
    }
}
