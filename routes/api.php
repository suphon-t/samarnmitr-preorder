<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')
    ->group(base_path('routes/api/auth.php'));

Route::group(["prefix" => "shop"], function() {
    Route::get('products', 'ShopController@allProducts')->name('shop.product.index');
    Route::put('orders', 'ShopController@makeOrder')->name('shop.order.make');

    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('myOrder', 'ShopController@myOrder')->name('shop.order.my');
    });
});
