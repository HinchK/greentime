<?php

namespace App\Http\Controllers;

use App\Models\League;
use App\Models\Player;
use App\Models\GameMatch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeagueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('leagues/index', [
            'leagues' => auth()->user()->leagues()->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('leagues/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $league = $request->user()->leagues()->create($validated);

        return redirect()->route('leagues.show', $league)->with('success', 'League created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(League $league)
    {
        $league->load(['matches.playerOne', 'matches.playerTwo']);

        // Calculate standings
        $players = auth()->user()->players()->get(); // Or players in this league if we had a pivot
        // For iteration 1, assuming all user players are available to be added to matches

        // A simple standings calculation based on matches in this league
        $standings = [];
        // This logic can be more complex, but for now let's just send the matches and players

        return Inertia::render('leagues/show', [
            'league' => $league,
            'players' => $players,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(League $league)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, League $league)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(League $league)
    {
        $league->delete();
        return redirect()->route('leagues.index');
    }

    /**
     * Add a match to the league (Custom endpoint logic, or handled via MatchController)
     * For now, I'll assume we create matches from the League Show page which might post to a specific endpoint
     * or we use a separate store method.
     * Let's add a method to store matches for a league here or use GameMatchController.
     * I'll use GameMatchController for updating, but maybe a dedicated route for creating a match in a league is easier.
     */
}
