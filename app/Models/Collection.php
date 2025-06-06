<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Collection extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
    ];
    public $timestamps = true;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($collection) {
            $collection->slug = Str::slug($collection->name);
        });

        static::updating(function ($collection) {
            if ($collection->isDirty('name')) {
                $collection->slug = Str::slug($collection->name);
            }
        });
    }
    protected static function booted()
    {
        static::creating(function ($collection) {
            $collection->slug = Str::slug($collection->name);
        });
    }
}
