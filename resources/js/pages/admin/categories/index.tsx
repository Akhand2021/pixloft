import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string;
}

interface Props {
    categories: Category[];
    status?: {
        type: 'success' | 'error';
        message: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/admin/categories',
    },
];

export default function CategoriesIndex({ categories, status }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            setIsDeleting(true);
            router.delete(`/admin/categories/${id}`, {
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
            <Head title="Categories Admin" />
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
                            <CardTitle>Categories</CardTitle>
                            <CardDescription>Manage your template categories</CardDescription>
                        </div>
                        <Button asChild>
                            <Link href="/admin/categories/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Category
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.id}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.slug}</TableCell>
                                        <TableCell>{new Date(category.created_at).toDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="icon" asChild>
                                                    <Link href={`/admin/categories/${category.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="icon" 
                                                    onClick={() => handleDelete(category.id)}
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
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 