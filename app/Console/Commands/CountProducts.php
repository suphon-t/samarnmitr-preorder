<?php

namespace App\Console\Commands;

use App\Order;
use App\Product;
use Illuminate\Console\Command;

class CountProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'products:count {paid=false}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Count number of ordered products';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $total_price = 0;
        $productMap = [];
        $productCounts = [];
        $this->info('Loading products...');
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
        $this->info('Loading orders...');
        if ($this->argument('paid') == 'true') {
            $orders = Order::whereNotNull('local_charge_id')->get();
        } else {
            $orders = Order::all();
        }
        $count = sizeof($orders);
        $this->info("Counting {$count} orders...");
        foreach ($orders as $order) {
            $contents = json_decode($order['cart_contents']);
            $total_price += $order['total_price'];
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
        $this->info("Done counting.\n");
        foreach ($products as $product) {
            if (sizeof($product->customizations) > 0) {
                $this->info($product->name . ": ");
                foreach ($product->customizations[0]->values as $value) {
                    $this->info(" - " . $value->name . ": " . $productCounts[$product->id][$value->name]);
                }
            } else {
                $this->info($product->name . ": " . $productCounts[$product->id]);
            }
        }
        $this->info("\nTotal price: {$total_price}");
        return true;
    }
}
