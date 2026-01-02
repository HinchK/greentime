import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import tournamentsRoute from '@/routes/tournaments';

interface Tournament {
    id: number;
    name: string;
    description: string | null;
    format: string;
}

export default function Index({ tournaments }: { tournaments: Tournament[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Tournaments', href: '/tournaments' }]}>
            <Head title="Tournaments" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Tournaments</h1>
                    <Link href={tournamentsRoute.create.url()}>
                        <Button>Create Tournament</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Tournaments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Format</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tournaments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                                            No tournaments found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    tournaments.map((tournament) => (
                                        <TableRow key={tournament.id}>
                                            <TableCell>
                                                <Link href={tournamentsRoute.show.url({ tournament: tournament.id })} className="font-medium hover:underline">
                                                    {tournament.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell className="capitalize">{tournament.format.replace('_', ' ')}</TableCell>
                                            <TableCell>
                                                <Link href={tournamentsRoute.show.url({ tournament: tournament.id })} className="text-blue-500 hover:underline">
                                                    View
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
