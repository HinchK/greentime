import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import matchesRoute from '@/routes/matches';

interface Player {
    id: number;
    name: string;
}

interface Match {
    id: number;
    player_one: Player | null;
    player_two: Player | null;
    player_one_score: number | null;
    player_two_score: number | null;
    status: string;
    round: number | null;
}

interface Tournament {
    id: number;
    name: string;
    description: string | null;
    format: string;
    matches: Match[];
}

export default function Show({ tournament, players }: { tournament: Tournament; players: Player[] }) {
    const { data, setData, post, processing, reset } = useForm({
        tournament_id: tournament.id,
        player_one_id: '',
        player_two_id: '',
        round: 1, // Default to round 1
    });

    const submitMatch = (e: React.FormEvent) => {
        e.preventDefault();
        post(matchesRoute.store.url(), {
            onSuccess: () => reset('player_one_id', 'player_two_id'),
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Tournaments', href: '/tournaments' },
            { title: tournament.name, href: `/tournaments/${tournament.id}` }
        ]}>
            <Head title={tournament.name} />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{tournament.name}</h1>
                        <p className="text-muted-foreground">{tournament.description}</p>
                        <p className="text-sm text-muted-foreground capitalize">Format: {tournament.format.replace('_', ' ')}</p>
                    </div>
                </div>

                 <div className="grid gap-6 md:grid-cols-2">
                    {/* Add Match Form (Manual for now) */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Add Match</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submitMatch} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Player One</Label>
                                        <select
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            value={data.player_one_id}
                                            onChange={(e) => setData('player_one_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Select Player</option>
                                            {players.map(p => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Player Two</Label>
                                        <select
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                            value={data.player_two_id}
                                            onChange={(e) => setData('player_two_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Select Player</option>
                                            {players.map(p => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <Label>Round</Label>
                                    <Input
                                        type="number"
                                        value={data.round}
                                        onChange={(e) => setData('round', parseInt(e.target.value))}
                                        min={1}
                                    />
                                </div>
                                <Button type="submit" disabled={processing} className="w-full">
                                    Add Match
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Bracket Visualization Placeholder */}
                     <Card>
                        <CardHeader>
                            <CardTitle>Bracket</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Bracket visualization coming soon.</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Matches</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Round</TableHead>
                                    <TableHead>Player One</TableHead>
                                    <TableHead>Score</TableHead>
                                    <TableHead>Player Two</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tournament.matches.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                                            No matches scheduled.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    tournament.matches.map((match) => (
                                        <TableRow key={match.id}>
                                            <TableCell>{match.round}</TableCell>
                                            <TableCell>{match.player_one?.name || 'Bye'}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold">{match.player_one_score ?? '-'}</span>
                                                    <span>-</span>
                                                    <span className="font-bold">{match.player_two_score ?? '-'}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{match.player_two?.name || 'Bye'}</TableCell>
                                            <TableCell className="capitalize">{match.status.replace('_', ' ')}</TableCell>
                                            <TableCell>
                                                <ScoreUpdater match={match} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

function ScoreUpdater({ match }: { match: Match }) {
    const { data, setData, put, processing } = useForm({
        player_one_score: match.player_one_score ?? 0,
        player_two_score: match.player_two_score ?? 0,
        status: 'completed'
    });

    const [editing, setEditing] = useState(false);

    if (!editing) {
        return <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>Update Score</Button>;
    }

    const save = () => {
        put(matchesRoute.update.url({ match: match.id }), {
            onSuccess: () => setEditing(false)
        });
    };

    return (
        <div className="flex items-center gap-2">
            <Input
                type="number"
                className="w-16 h-8"
                value={data.player_one_score}
                onChange={e => setData('player_one_score', parseInt(e.target.value))}
            />
            <span>-</span>
            <Input
                type="number"
                className="w-16 h-8"
                value={data.player_two_score}
                onChange={e => setData('player_two_score', parseInt(e.target.value))}
            />
            <Button size="sm" onClick={save} disabled={processing}>Save</Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
        </div>
    );
}
