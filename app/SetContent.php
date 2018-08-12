<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SetContent extends Model
{
    protected $table = "set_contents";

    public function set() {
        return $this->belongsTo(Product::class, 'set_id');
    }

    public function product() {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
