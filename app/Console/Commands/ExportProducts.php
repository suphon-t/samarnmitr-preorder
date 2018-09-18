<?php

namespace App\Console\Commands;

use App\Order;
use App\Product;
use Illuminate\Console\Command;

class ExportProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'products:export {excludeUnpaid=true}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export products to csv';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function countOrder($order, $countTemplate, $productMap, $products, $includeUnpaid) {
        $output = "," . $order['user_id'] . ",";
        $productCounts = json_decode(json_encode($countTemplate), true);
        $contents = json_decode($order['cart_contents']);
        $total_price = $order['total_price'];
        $output .= $total_price . ",,";
        $paid = $order['local_charge_id'] != null;
        if ($paid || $includeUnpaid) {
            foreach ($contents as $item) {
                $id = $item->info->id;
                $amount = $item->amount;
                $product = $productMap[$id];
                if ($product->is_set) {
                    $productCounts[$id] += $amount;
                }
                $customizationMap = [];
                foreach ($item->info->customizations as $customization) {
                    $customizationMap[$customization->pivotId] = $customization;
                }
                foreach ($product->contents as $content) {
                    $cId = $content->id;
                    if (sizeof($content->customizations) > 0) {
                        $customization = $customizationMap[$content->pivot->id];
                        $name = $content->customizations[0]->name;
                        $value = $customization->values->$name;
                        $productCounts[$content->id][$value] += $amount;
                    } else {
                        $productCounts[$cId] += $amount;
                    }
                }
            }
        }
        foreach ($products as $product) {
            if ($product->is_set) continue;
            if (sizeof($product->customizations) > 0) {
                foreach ($product->customizations[0]->values as $value) {
                    if ($productCounts[$product->id][$value->name] > 0) {
                        $output .= $value->name . "(" . $productCounts[$product->id][$value->name] . ") ";
                    }
                }
            } else {
                if ($productCounts[$product->id] > 0) {
                    $output .= $productCounts[$product->id];
                }
            }
            $output .= ",";
        }
        if (!$paid) {
            $output .= "ยังไม่จ่าย";
        }
        return $output;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $productMap = [];
        $productCounts = [];
        $products = Product::with('customizations')->with('customizations.values')->get();
        foreach ($products as $product) {
            $productMap[$product->id] = $product;
            if (sizeof($product->customizations) > 0) {
                $template = [];
                foreach ($product->customizations[0]->values as $value) {
                    $template[$value->name] = 0;
                }
                $productCounts[$product->id] = $template;
            } else {
                $productCounts[$product->id] = 0;
            }
        }
        $includeUnpaid = $this->argument('excludeUnpaid') == 'false';
        $orders = Order::all();
        $header = "QC,Order,Price,ID,";
        foreach ($products as $product) {
            if ($product->is_set) continue;
            $header .= $product->name . ",";
        }
        $header .= "หมายเหตุ,";
        $this->info($header);
        foreach ($orders as $order) {
            $this->info($this->countOrder($order, $productCounts, $productMap, $products, $includeUnpaid));
        }
        return true;
    }
}
