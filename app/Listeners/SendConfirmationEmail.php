<?php

namespace App\Listeners;

use App\Events\OrderCreated;
use App\Mail\NewOrder;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

class SendConfirmationEmail
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  OrderCreated  $event
     * @return void
     */
    public function handle(OrderCreated $event)
    {
        try {
            Mail::to($event->order->user->email)->send(new NewOrder($event->order));
        } catch (\Exception $e) {
            
        }
    }
}
