<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'template_id',
        'quantity',
        'total_price',
        'status',
    ];
}
