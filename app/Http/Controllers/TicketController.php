<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;

class TicketController extends Controller
{
    // 📥 Créer un ticket
    public function store(Request $request)
    {
        try {
            $request->validate([
                'titre' => 'required|string|max:255',
                'description' => 'required|string',
                'priorite' => 'required|in:Faible,Moyenne,Élevée,Critique',
            ]);
    
            $ticket = Ticket::create([
                'titre' => $request->titre,
                'description' => $request->description,
                'priorite' => $request->priorite,
                'statut' => 'Ouvert',
                'id_employe' => 1,
                'date_creation' => now(),
                'date_mise_a_jour' => now(),
                'id_technicien' => null,
            ]);
    
            return response()->json([
                'message' => '✅ Ticket créé avec succès !',
                'ticket' => $ticket
            ], 201);
    
        } catch (\Throwable $e) {
            return response()->json([
                'message' => '❌ Erreur Laravel',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    // 📋 Lister tous les tickets
    public function index()
    {
        return Ticket::all();
    }

    // 🛠 Modifier un ticket
    public function update(Request $request, $id)
    {
        $ticket = Ticket::findOrFail($id);

        $ticket->update([
            'statut' => $request->input('statut', $ticket->statut),
            'date_mise_a_jour' => now(),
        ]);

        return response()->json([
            'message' => '🔄 Ticket mis à jour',
            'ticket' => $ticket
        ]);
    }

    // 🗑 Supprimer un ticket
    public function destroy($id)
    {
        $ticket = Ticket::findOrFail($id);
        $ticket->delete();

        return response()->json(['message' => '🗑 Ticket supprimé']);
    }
}
