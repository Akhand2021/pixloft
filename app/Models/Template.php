<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Template extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'price',
        'file_path',
        'preview_image',
        'template_type_id',
        'collection_id',
        'category_id',
    ];

    public function templateType()
    {
        return $this->belongsTo(TemplateType::class);
    }

    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($template) {
            $template->slug = Str::slug($template->title);
        });

        static::updating(function ($template) {
            $template->slug = Str::slug($template->title);
        });
    }

}
