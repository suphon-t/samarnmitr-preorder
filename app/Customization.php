<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customization extends Model
{
    protected $table = "customizations";

    public function values() {
        return $this->hasMany('App\CustomizationValue');
    }
}
