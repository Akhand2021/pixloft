import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BreadcrumbItem } from '@/components/ui/breadcrumb';

interface TemplateType {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    templateType: TemplateType;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Templates Types',
        href: '/admin/templates-types',
    },
    {
        title: 'Edit Template Type',
        href: '/admin/templates-types/edit',
    },
];
export default function EditTemplateType({ templateType }: Props) {
    const { data, setData, put, errors, processing } = useForm({
        name: templateType.name,

    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/templates-types/' + templateType.id, {
            onSuccess: () => {
                router.visit('/admin/templates-types');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Template Type" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Template Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">

                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Template Type Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && (
                                    <p className="text-sm text-destructive">{errors.name}</p>
                                )}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" type="button" onClick={() => router.visit('/admin/templates-types')}>Cancel</Button>
                                <Button type="submit" disabled={processing}>Save</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}