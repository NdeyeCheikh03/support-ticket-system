<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'statut',
        'priorite',
        'date_creation',
        'date_mise_a_jour',
        'id_employe',
        'id_technicien',
    ];

    // 🎯 Relation : le ticket appartient à un employé
    public function employe()
    {
        return $this->belongsTo(User::class, 'id_employe');
    }

    // 🔧 Relation : le ticket peut être pris en charge par un technicien
    public function technicien()
    {
        return $this->belongsTo(User::class, 'id_technicien');
    }

    // 💬 Relation : un ticket peut avoir plusieurs commentaires
    public function commentaires()
    {
        return $this->hasMany(Commentaire::class);
    }
}
