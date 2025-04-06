<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Les attributs modifiables en masse.
     */
    protected $fillable = [
        'nom',
        'email',
        'password',
        'role',
        'date_inscription',
    ];

    /**
     * Attributs cachés lors de la sérialisation (API).
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Attributs castés automatiquement.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'date_inscription' => 'datetime',
    ];

    /**
     * Tickets créés par l'utilisateur (employé).
     */
    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'id_employe');
    }

    /**
     * Tickets assignés à l'utilisateur (technicien).
     */
    public function ticketsAssignes()
    {
        return $this->hasMany(Ticket::class, 'id_technicien');
    }

    /**
     * Commentaires rédigés par l'utilisateur.
     */
    public function commentaires()
    {
        return $this->hasMany(Commentaire::class, 'user_id');
    }
}
