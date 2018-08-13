<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customization extends Model
{
    protected $table = "customizations";

    public function default() {
        return $this->belongsTo(CustomizationValue::class, 'default_id');
    }

    public function values() {
        return $this->hasMany(CustomizationValue::class);
    }
}
