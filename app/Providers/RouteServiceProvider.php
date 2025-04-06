<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api') // 👉 C'est ce préfixe qui rend /api/actif
                ->group(base_path('routes/api.php'));

            Route::middleware('web') 
                ->group(base_path('routes/web.php'));
        });
    }
}
