import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';
import tournamentsRoute from '@/routes/tournaments';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        format: 'single_elimination',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(tournamentsRoute.store.url());
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Tournaments', href: '/tournaments' },
            { title: 'Create', href: '/tournaments/create' }
        ]}>
            <Head title="Create Tournament" />
            <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto w-full">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Tournament</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Tournament Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="format">Format</Label>
                                <select
                                    id="format"
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.format}
                                    onChange={(e) => setData('format', e.target.value)}
                                >
                                    <option value="single_elimination">Single Elimination</option>
                                    <option value="round_robin">Round Robin</option>
                                </select>
                                {errors.format && <p className="text-sm text-red-500">{errors.format}</p>}
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    Create Tournament
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
