<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LocalCharge extends Model
{
    protected $fillable = [
        'amount', 'payee_id',
    ];

    public function payee() {
        return $this->belongsTo(User::class, 'payee_id');
    }
}
