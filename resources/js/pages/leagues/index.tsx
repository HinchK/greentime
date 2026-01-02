import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import leaguesRoute from '@/routes/leagues';

interface League {
    id: number;
    name: string;
    description: string | null;
}

export default function Index({ leagues }: { leagues: League[] }) {
    return (
        <AppLayout breadcrumbs={[{ title: 'Leagues', href: '/leagues' }]}>
            <Head title="Leagues" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Leagues</h1>
                    <Link href={leaguesRoute.create.url()}>
                        <Button>Create League</Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Your Leagues</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leagues.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                                            No leagues found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    leagues.map((league) => (
                                        <TableRow key={league.id}>
                                            <TableCell>
                                                <Link href={leaguesRoute.show.url({ league: league.id })} className="font-medium hover:underline">
                                                    {league.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{league.description || '-'}</TableCell>
                                            <TableCell>
                                                <Link href={leaguesRoute.show.url({ league: league.id })} className="text-blue-500 hover:underline">
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
