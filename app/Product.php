<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = "products";

    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public function customizations() {
        return $this->belongsToMany(Customization::class, 'product_customizations');
    }

    public function contents() {
        return $this->belongsToMany(Product::class, 'set_contents', 'set_id')->withPivot('id');
    }

    public static function buildQuery() {
        return static::with('contents')
            ->with('contents.customizations')
            ->with('contents.customizations.default')
            ->with('contents.customizations.values');
    }
}
