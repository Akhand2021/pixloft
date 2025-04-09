import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface Template {
    id: number;
    name: string;
    description: string;
    file_path: string;
    preview_image: string;
    category: {
        id: number;
        name: string;
    };
    collection: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Props {
    templates: Template[];
    status?: {
        type: 'success' | 'error';
        message: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Templates',
        href: '/templates',
    },
    {
        title: 'Admin',
        href: '/admin/templates',
    },
];

export default function Templates({ templates = [], status }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this template?')) {
            setIsDeleting(true);
            router.delete(`/admin/templates/${id}`, {
                onSuccess: () => {
                    setIsDeleting(false);
                },
                onError: () => {
                    setIsDeleting(false);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Templates" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {status && (
                    <Alert className={cn(
                        status.type === 'success' 
                            ? 'bg-green-50 border-green-200 text-green-900 font-medium' 
                            : 'bg-red-50 border-red-200 text-red-900 font-medium'
                    )}>
                        <AlertDescription>{status.message}</AlertDescription>
                    </Alert>
                )}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Templates</CardTitle>
                            <CardDescription>Manage your templates</CardDescription>
                        </div>
                        <Button asChild>
                            <Link href="admin/templates/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Template
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {templates.length === 0 ? (
                            <div className="text-center py-6 text-muted-foreground">
                                No templates found.
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Collection</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {templates.map((template) => (
                                        <TableRow key={template.id}>
                                            <TableCell>{template.title}</TableCell>
                                            <TableCell>{template.category?.name || '-'}</TableCell>
                                            <TableCell>{template.collection?.name || '-'}</TableCell>
                                            <TableCell>{new Date(template.created_at).toLocaleDateString()}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="icon" asChild>
                                                        <Link href={`/admin/templates/${template.id}`}>
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="outline" size="icon" asChild>
                                                        <Link href={`/admin/templates/${template.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="icon" 
                                                        onClick={() => handleDelete(template.id)}
                                                        disabled={isDeleting}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 