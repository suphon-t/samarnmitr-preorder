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
    protected $signature = 'products:count';

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
        $productCounts = [];
        $this->info('Loading products...');
        $products = Product::all();
        foreach ($products as $product) {
            $productCounts[$product->id] = 0;
        }
        $this->info('Loading orders...');
        $orders = Order::all();
        $this->info('Counting...');
        foreach ($orders as $order) {
            $contents = json_decode($order['cart_contents']);
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
        return true;
    }
}
