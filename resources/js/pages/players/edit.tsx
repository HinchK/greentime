import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';
import playersRoute from '@/routes/players';

interface Player {
    id: number;
    name: string;
    email: string | null;
}

export default function Edit({ player }: { player: Player }) {
    const { data, setData, put, processing, errors } = useForm({
        name: player.name,
        email: player.email || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(playersRoute.update.url({ player: player.id }));
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Players', href: '/players' },
            { title: 'Edit', href: `/players/${player.id}/edit` }
        ]}>
            <Head title="Edit Player" />
            <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Player</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email (Optional)</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    Update Player
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
