<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\LocalCharge;
use App\Order;
use App\Reception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ManageController extends Controller
{
    public function orderStatus(Request $request) {
        $data = $request->all();
        $order = $this->findOrder($data);
        $order->chargeStatus = $order->chargeStatus();
        return $order;
    }

    public function editOrder(Request $request) {
        $data = $request->all();
        $order = $this->findOrder($data);
        switch ($data['action']) {
            case "togglePaidStatus":
                if (!$order['charge_id']) {
                    if ($order['local_charge_id']) {
                        $order['local_charge_id'] = null;
                        $order->save();
                    } else {
                        $localCharge = LocalCharge::create([
                            'amount' => $order['total_price'],
                            'payee_id' => Auth::user()->id,
                        ]);
                        $order['local_charge_id'] = $localCharge['id'];
                        $order->save();
                    }
                }
                break;
            case "toggleReceivedStatus":
                if ($order['reception_id']) {
                    $order['reception_id'] = null;
                    $order->save();
                } else {
                    $reception = Reception::create([
                        'sender_id' => Auth::user()->id,
                    ]);
                    $order['reception_id'] = $reception['id'];
                    $order->save();
                }
                break;
        }
        return response()->json([], 200);
    }

    private function findOrder($data) {
        return Order::where([
            'user_id' => $data['id'],
            'key' => $data['key'],
        ])->with('reception')->with('reception.sender')->firstOrFail();
    }
}
