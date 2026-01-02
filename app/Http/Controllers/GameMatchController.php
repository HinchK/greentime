<?php

namespace App\Http\Controllers;

use App\Models\GameMatch;
use Illuminate\Http\Request;

class GameMatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Logic to create a match manually
        $validated = $request->validate([
            'league_id' => 'nullable|exists:leagues,id',
            'tournament_id' => 'nullable|exists:tournaments,id',
            'player_one_id' => 'required|exists:players,id',
            'player_two_id' => 'required|exists:players,id',
            'round' => 'nullable|integer|min:1',
        ]);

        GameMatch::create($validated);

        return back()->with('success', 'Match created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(GameMatch $gameMatch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GameMatch $gameMatch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GameMatch $match)
    {
        $validated = $request->validate([
            'player_one_score' => 'required|integer|min:0',
            'player_two_score' => 'required|integer|min:0',
            'status' => 'required|in:scheduled,in_progress,completed',
        ]);

        $match->update($validated);

        return back()->with('success', 'Match updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GameMatch $gameMatch)
    {
        $gameMatch->delete();
        return back();
    }
}
