<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LocalCharge extends Model
{
    public function payee() {
        return $this->belongsTo(User::class, 'payee_id');
    }
}
