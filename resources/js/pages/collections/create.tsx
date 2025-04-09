import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { AlertMessage } from '@/components/ui/alert-message';
import { useEffect, useState } from 'react';

interface PageProps extends Record<string, unknown> {
    flash: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Collections',
        href: '/collections',
    },
    {
        title: 'Create',
        href: '/collections/create',
    },
];

export default function CreateCollection() {
    const { flash } = usePage<PageProps>().props;
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { data, setData, post, processing, errors, isDirty } = useForm({
        name: '',
        description: '',
    });

    useEffect(() => {
        if (flash.success) {
            setSuccessMessage(flash.success);
            setShowSuccess(true);
        }
    }, [flash.success]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/collections', {
            onSuccess: () => {
                setSuccessMessage('Collection created successfully!');
                setShowSuccess(true);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Collection" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {showSuccess && (
                    <AlertMessage
                        message={successMessage}
                        type="success"
                        onClose={() => setShowSuccess(false)}
                    />
                )}
                {Object.keys(errors).length > 0 && (
                    <AlertMessage
                        message={
                            <div>
                                Please fix the following errors:
                                <ul className="mt-2 list-inside list-disc">
                                    {Object.entries(errors).map(([field, error]) => (
                                        <li key={field}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        }
                        type="error"
                    />
                )}
                <Card>
                    <CardHeader>
                        <CardTitle>Create Collection</CardTitle>
                        <CardDescription>Add a new template collection</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Enter collection name"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Enter collection description"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description}</p>
                                )}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing || !isDirty}>
                                    {processing ? 'Creating...' : 'Create Collection'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 