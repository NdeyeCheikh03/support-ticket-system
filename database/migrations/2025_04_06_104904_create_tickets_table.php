<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->text('description');
            $table->enum('statut', ['Ouvert', 'En cours', 'Résolu', 'Fermé'])->default('Ouvert');
            $table->enum('priorite', ['Faible', 'Moyenne', 'Élevée', 'Critique'])->default('Faible');
            $table->timestamp('date_creation')->useCurrent();
            $table->timestamp('date_mise_a_jour')->useCurrent()->nullable();
            $table->foreignId('id_employe')->constrained('users'); // Employé qui a créé le ticket
            $table->foreignId('id_technicien')->nullable()->constrained('users'); // Technicien assigné
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
