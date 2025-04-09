<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TemplateType extends Model
{
    protected $fillable = ['name', 'slug'];

    public function templates()
    {
        return $this->hasMany(Template::class);
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($templateType) {
            $templateType->slug = Str::slug($templateType->name);
        });

        static::updating(function ($templateType) {

            if ($templateType->isDirty('name')) {
                $templateType->slug = Str::slug($templateType->name);
            }
        });
    }
}
