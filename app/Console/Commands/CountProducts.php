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
        $productCounts = [];
        $this->info('Loading products...');
        $products = Product::all();
        foreach ($products as $product) {
            $productCounts[$product->id] = 0;
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
            foreach ($contents as $content) {
                $id = $content->info->id;
                $amount = $content->amount;
                $productCounts[$id] += $amount;
            }
        }
        $this->info("Done counting.\n");
        foreach ($products as $product) {
            $this->info($product->name . ": " . $productCounts[$product->id]);
        }
        $this->info("\nTotal price: {$total_price}");
        return true;
    }
}
