import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import playersRoute from '@/routes/players';

interface Player {
    id: number;
    name: string;
    email: string | null;
}

export default function Index({ players }: { players: Player[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Players', href: '/players' }]}>
            <Head title="Players" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Players</h1>
                    <Link href={playersRoute.create.url()}>
                        <Button>Add Player</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Players</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {players.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                                            No players found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    players.map((player) => (
                                        <TableRow key={player.id}>
                                            <TableCell>{player.name}</TableCell>
                                            <TableCell>{player.email || '-'}</TableCell>
                                            <TableCell>
                                                <Link href={playersRoute.edit.url({ player: player.id })} className="text-blue-500 hover:underline">
                                                    Edit
                                                </Link>
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
