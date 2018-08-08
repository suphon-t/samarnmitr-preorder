<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Order;
use App\Product;
use App\User;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function allProducts() {
        return [
            'products' => Product::with('customizations')->with('customizations.values')->get()
        ];
    }

    public function makeOrder(Request $request) {
        $cart = ['items' => []];
        try {
            $data = $request->all();
            foreach ($data['cart']['items'] as $item) {
                $customizations = [];
                foreach ($item['info']['customizations'] as $name => $value) {
                    $customizations[$name] = $value;
                }
                $info = [
                    'id' => $item['info']['id'],
                    'customizations' => $customizations
                ];
                $cart['items'][] = [
                    'info' => $info,
                    'amount' => $item['amount']
                ];
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'cart_contents_malformed'], 400);
        }
        $password = str_random(10);
        $user = $this->createUser($password);
        Order::create([
            'cart_contents' => json_encode($cart['items']),
            'user_id' => $user->id,
        ]);
        return [
            'user_id' => $user->id,
            'password' => $password,
        ];
    }

    protected function createUser($password)
    {
        return User::create([
            'name' => 'Customer',
            'password' => bcrypt($password),
        ]);
    }
}
