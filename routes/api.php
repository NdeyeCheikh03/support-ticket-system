<?php

use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentaireController;

// ✅ Test rapide
Route::get('/ping', function () {
    return response()->json(['message' => 'API OK']);
});

// ✅ Auth publique
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// ✅ LIBRES d’accès (sans token)
Route::post('/tickets', [TicketController::class, 'store']);
Route::get('/tickets', [TicketController::class, 'index']); // ✅ déplacé ici

// ✅ PROTÉGÉES
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/users', [AdminController::class, 'indexUsers']);
    Route::post('/admin/users', [AdminController::class, 'storeUser']);
    Route::delete('/admin/users/{id}', [AdminController::class, 'destroyUser']);
    
    Route::get('/admin/stats', [AdminController::class, 'stats']);
    Route::put('/admin/tickets/{id}/assign', [AdminController::class, 'assignTechnician']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::put('/tickets/{id}', [TicketController::class, 'update']);
    Route::delete('/tickets/{id}', [TicketController::class, 'destroy']);

    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    Route::post('/tickets/{id}/commentaires', [CommentaireController::class, 'store']);

    Route::middleware('role:Admin')->get('/stats', function () {
        return response()->json([
            'tickets_total' => \App\Models\Ticket::count(),
            'tickets_ouverts' => \App\Models\Ticket::where('statut', 'Ouvert')->count(),
        ]);
    });
    Route::get('/technician/tickets', [\App\Http\Controllers\TechnicianTicketController::class, 'index']);

    // 🔁 Technicien : mettre à jour le statut
    Route::put('/technician/tickets/{id}', [\App\Http\Controllers\TechnicianTicketController::class, 'update']);
});
