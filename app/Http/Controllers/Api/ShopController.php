<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Product;

class ShopController extends Controller
{
    public function allProducts() {
        return response()->json([
            'products' => Product::with('customizations')->with('customizations.values')->get()
        ]);
    }
}
