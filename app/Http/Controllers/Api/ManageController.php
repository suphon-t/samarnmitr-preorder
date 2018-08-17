<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ManageController extends Controller
{
    public function orderStatus(Request $request) {
        $data = $request->all();
        $order = Order::where([
            'id' => $data['id'],
            'key' => $data['key'],
        ])->firstOrFail();
        $order->chargeStatus = $order->chargeStatus();
        return $order;
    }
}
