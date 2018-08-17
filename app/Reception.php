<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reception extends Model
{
    protected $fillable = [
        'amount', 'sender_id',
    ];

    public function sender() {
        return $this->belongsTo(User::class, 'sender_id');
    }
}
