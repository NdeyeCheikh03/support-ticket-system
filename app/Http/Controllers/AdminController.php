<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Ticket;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // 👥 Liste des utilisateurs
    public function indexUsers()
    {
        return User::all();
    }

    // ➕ Créer un utilisateur
    public function storeUser(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'email' => 'required|email|unique:users',
            'role' => 'required|in:Employé,Technicien,Admin',
        ]);

        $user = User::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'password' => bcrypt('password'), // mot de passe par défaut à changer
            'role' => $request->role,
            'date_inscription' => now(),
        ]);

        return response()->json([
            'message' => 'Utilisateur créé',
            'user' => $user
        ], 201);
    }

    // ❌ Supprimer un utilisateur
    public function destroyUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé']);
    }

    // 📊 Statistiques
    public function stats()
    {
        $techs = User::where('role', 'Technicien')->get();

        return response()->json([
            'tickets_total' => Ticket::count(),
            'tickets_ouverts' => Ticket::where('statut', 'Ouvert')->count(),
            'tickets_resolus' => Ticket::where('statut', 'Résolu')->count(),
            'tickets_critiques' => Ticket::where('priorite', 'Critique')->count(),
            'techs' => $techs->map(function ($t) {
                return [
                    'nom' => $t->nom,
                    'tickets' => $t->ticketsAssignes->count(),
                ];
            })
        ]);
    }

    // 👨‍🔧 Assigner un technicien
    public function assignTechnician(Request $request, $id)
    {
        $request->validate([
            'id_technicien' => 'required|exists:users,id',
        ]);

        $ticket = Ticket::findOrFail($id);
        $ticket->id_technicien = $request->id_technicien;
        $ticket->statut = 'En cours';
        $ticket->date_mise_a_jour = now();
        $ticket->save();

        return response()->json([
            'message' => 'Technicien assigné',
            'ticket' => $ticket
        ]);
    }
}
