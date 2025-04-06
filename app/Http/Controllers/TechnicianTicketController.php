<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TechnicianTicketController extends Controller
{
    // 📋 Lister les tickets "Ouvert" ou "En cours"
    public function index()
    {
        $tickets = Ticket::whereIn('statut', ['Ouvert', 'En cours'])->get();

        return response()->json($tickets);
    }

    // 🔁 Mettre à jour le statut du ticket (ex: En cours, Résolu, Fermé)
    public function update(Request $request, $id)
    {
        $request->validate([
            'statut' => 'required|in:En cours,Résolu,Fermé',
        ]);

        $ticket = Ticket::findOrFail($id);
        $ticket->statut = $request->statut;
        $ticket->date_mise_a_jour = now();
        $ticket->id_technicien = auth()->id();
 // Remplacer par auth()->id() si connecté
        $ticket->save();

        return response()->json([
            'message' => '✅ Statut mis à jour',
            'ticket' => $ticket
        ]);
    }
}
