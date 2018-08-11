<?php

namespace App\Http\Controllers\Api;

use App\Events\OrderCreated;
use App\Http\Controllers\Controller;
use App\Order;
use App\Product;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ShopController extends Controller
{
    public function allProducts() {
        return [
            'products' => Product::with('customizations')->with('customizations.values')->get()
        ];
    }

    public function makeOrder(Request $request) {
        $data = $request->all();
        $validator = Validator::make($data, [
            'email' => 'required|email|unique:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'invalid_email'], 400);
        }

        $cart = ['items' => []];
        $totalPrice = 0;
        try {
            foreach ($data['cart']['items'] as $item) {
                $product = Product::where('id', $item['info']['id'])->with('customizations')->firstOrFail();
                $customizations = [];
                foreach ($product->customizations as $customization) {
                    $value = $customization->values()
                        ->where('name', $item['info']['customizations'][$customization->name])->firstOrFail();
                    $customizations[$customization->name] = $value->name;
                }
                $info = [
                    'id' => $item['info']['id'],
                    'customizations' => $customizations
                ];
                $cart['items'][] = [
                    'info' => $info,
                    'amount' => $item['amount']
                ];
                $totalPrice += $item['amount'] * $product->price;
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'cart_contents_malformed'], 400);
        }

        DB::beginTransaction();
        try {
            $password = str_random(10);
            $user = $this->createUser($data['email'], $password);
            $order = $this->createOrder($user, $password, $cart['items'], $totalPrice);
            DB::commit();
            event(new OrderCreated($order));
            return [
                'user_id' => $user->id,
                'password' => $password,
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'internal_error',
                'message' => $e->getMessage(),
                'trace' => $e->getTrace(),
                'request' => $data,
            ], 500);
        }
    }

    public function myOrder(Request $request) {
        $user = $request->user();
        return Order::mine($user->id)->firstOrFail();
    }

    protected function createUser($email, $password)
    {
        return User::create([
            'name' => 'Customer',
            'email' => $email,
            'password' => bcrypt($password),
        ]);
    }

    protected function createOrder($user, $password, $items, $totalPrice) {
        return Order::create([
            'key' => $password,
            'cart_contents' => json_encode($items),
            'total_price' => $totalPrice,
            'user_id' => $user->id,
        ]);
    }
}
