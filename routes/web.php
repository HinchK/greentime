<?php

use App\Http\Controllers\GameMatchController;
use App\Http\Controllers\LeagueController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TournamentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Players
    Route::resource('players', PlayerController::class);

    // Leagues
    Route::resource('leagues', LeagueController::class);

    // Tournaments
    Route::resource('tournaments', TournamentController::class);

    // Matches
    Route::post('matches', [GameMatchController::class, 'store'])->name('matches.store');
    Route::put('matches/{match}', [GameMatchController::class, 'update'])->name('matches.update');
    Route::delete('matches/{match}', [GameMatchController::class, 'destroy'])->name('matches.destroy');
});

require __DIR__.'/settings.php';
