<?php

namespace App\Http\Controllers\Api;

use App\Events\OrderCreated;
use App\Http\Controllers\Controller;
use App\Order;
use App\Product;
use App\SetContent;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use OmiseCharge;

class ShopController extends Controller
{
    public function allProducts() {
        return [
            'products' => Product::buildQuery()->where('is_set', false)->get(),
            'sets' => Product::buildQuery()->where('is_set', true)->get(),
        ];
    }

    public function makeOrder(Request $request) {
        $data = $request->all();
        /*
        $validator = Validator::make($data, [
            'email' => 'required|email|unique:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'invalid_email'], 400);
        }
        */

        $cart = ['items' => []];
        $totalPrice = 0;
        try {
            foreach ($data['cart']['items'] as $item) {
                $info = $item['info'];
                $product = Product::buildQuery()->where('id', $info['id'])->firstOrFail();
                $allCustomizations = [];
                foreach ($info['customizations'] as $customizationEntry) {
                    $customizations = [];
                    $pivot = SetContent::where('id', $customizationEntry['pivotId'])->with('product')->firstOrFail();
                    if ($pivot->set_id != $product->id) {
                        throw new \Exception();
                    }
                    foreach ($pivot->product->customizations as $customization) {
                        $value = $customization->values()
                            ->where('name', $customizationEntry['values'][$customization->name])->firstOrFail();
                        $customizations[$customization->name] = $value->name;
                    }
                    $allCustomizations[] = [
                        'pivotId' => $pivot->id,
                        'values' => $customizations,
                    ];
                }
                $info = [
                    'id' => $item['info']['id'],
                    'customizations' => $allCustomizations
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
        $order = $this->getMyOrder($request);
        $order->chargeStatus = $order->chargeStatus();
        return $order;
    }

    public function chargeMyOrder(Request $request) {
        $data = $request->all();
        $validator = Validator::make($data, [
            'token' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'missing_token'], 400);
        }

        $order = $this->getMyOrder($request);

        $charge = OmiseCharge::create([
            'amount' => $order->total_price * 100,
            'currency' => 'thb',
            'card' => $data['token'],
        ]);

        $order->charge_id = $charge['id'];
        $order->save();

        return ["true"];
    }

    private function getMyOrder(Request $request) {
        return Order::mine($request->user()->id)->firstOrFail();
    }

    protected function createUser($email, $password)
    {
        return User::create([
            'name' => 'Customer',
            'email' => str_random(10) . '@' . str_random(10) . '.com',
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
