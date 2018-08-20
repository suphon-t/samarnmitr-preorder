<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreatePassword extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:password {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate password';

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
        $password = $this->argument('password');
        $result = bcrypt($password);
        $this->info("Result: {$result}");
        return true;
    }
}
