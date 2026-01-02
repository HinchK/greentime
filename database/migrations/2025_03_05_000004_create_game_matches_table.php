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
        Schema::create('game_matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tournament_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('league_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('player_one_id')->nullable()->constrained('players')->nullOnDelete();
            $table->foreignId('player_two_id')->nullable()->constrained('players')->nullOnDelete();
            $table->integer('player_one_score')->nullable();
            $table->integer('player_two_score')->nullable();
            $table->dateTime('start_time')->nullable();
            $table->integer('round')->nullable();
            $table->string('status')->default('scheduled'); // scheduled, in_progress, completed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_matches');
    }
};
