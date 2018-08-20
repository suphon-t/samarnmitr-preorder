<?php

namespace App\Console\Commands;

use App\User;
use Illuminate\Console\Command;

class CreateAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create {name} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create an admin';

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
        $name = $this->argument('name');
        $password = $this->argument('password');
        $this->info("Creating admin user {$name}");
        $user = User::create([
            'name' => $name,
            'email' => str_random(10) . '@' . str_random(10) . '.com',
            'password' => bcrypt($password),
        ]);
        $this->info("id: {$user->id}");
        return true;
    }
}
