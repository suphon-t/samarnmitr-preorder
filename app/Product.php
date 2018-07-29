<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = "products";

    public function customizations() {
        return $this->belongsToMany('App\Customization', 'product_customizations');
    }
}
