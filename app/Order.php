<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OmiseCharge;

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
        return $this->belongsTo(User::class);
    }

    public function localCharge() {
        return $this->belongsTo(LocalCharge::class);
    }

    public function chargeStatus() {
        $localCharge = $this->localCharge()->with('payee')->first();
        if (!$localCharge && $this['charge_id']) {
            $charge = OmiseCharge::retrieve($this['charge_id']);
            return [
                'amount' => $charge['amount'] / 100,
                'status' => $charge['status'],
                'created_at' => $charge['created'],
                'payee' => [
                    'name' => 'Omise'
                ]
            ];
        }
        return $localCharge;
    }

    public function reception() {
        return $this->belongsTo(Reception::class);
    }
}
