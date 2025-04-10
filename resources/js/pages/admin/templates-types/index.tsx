import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface TemplateType {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
}

interface Props {
    templateTypes: TemplateType[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin',
    },
    {
        title: 'Template Types',
        href: '/admin/templates-types',
    },
];

export default function TemplateTypesIndex({ templateTypes }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Template Types" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Template Types</CardTitle>
                            <CardDescription>Manage your template types</CardDescription>
                        </div>
                        <Link href="/admin/templates-types/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                New Template Type
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {templateTypes.map((templateType) => (
                                    <TableRow key={templateType.id}>
                                        <TableCell>
                                            <Link 
                                                href={`/admin/templates-types/${templateType.id}/edit`}
                                                className="text-primary hover:underline"
                                            >
                                                {templateType.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{templateType.description}</TableCell>
                                        <TableCell>{new Date(templateType.created_at).toDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Link 
                                                href={`/admin/templates-types/${templateType.id}/edit`}
                                                className="text-primary hover:underline"
                                            >
                                                Edit
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
