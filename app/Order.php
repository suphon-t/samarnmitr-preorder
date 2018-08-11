<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'cart_contents', 'total_price', 'user_id', 'key',
    ];

    protected $hidden = [
        'key',
    ];

    public function scopeMine($query, $user_id)
    {
        return $query->where('user_id', $user_id);
    }

    public function user() {
        return $this->belongsTo('App\User');
    }
}
