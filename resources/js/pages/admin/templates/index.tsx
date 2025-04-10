import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Template {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
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
        title: 'Admin',
        href: '/admin',
    },
    {
        title: 'Templates',
        href: '/admin/templates',
    },
];

export default function TemplatesIndex({ templates, status }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin - Templates" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            {status && (
                    <Alert className={cn(
                        status.type === 'success' 
                            ? 'bg-white border-green-200 text-green-900 font-medium' 
                            : 'bg-white border-red-200 text-red-900 font-medium'
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
                        <Link href="/admin/templates/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                New Template
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {templates.map((template) => (
                                    <TableRow key={template.id}>
                                        <TableCell>
                                            <Link
                                                href={`/admin/templates/${template.id}/edit`}
                                                className="text-primary hover:underline"
                                            >
                                                {template.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{template.description}</TableCell>
                                        <TableCell>${Number(template.price).toFixed(2)}</TableCell>
                                        <TableCell>{new Date(template.created_at).toDateString()}</TableCell>
                                        <TableCell className="text-right">
                                                <Button variant="outline" size="icon" asChild>
                                                <Link
                                                    href={`/admin/templates/${template.id}/edit`}
                                                    className="text-primary hover:underline"
                                            >
                                                <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="outline" size="icon" asChild>
                                                <Link
                                                    href={`/admin/templates/${template.id}/delete`}
                                                    className="text-primary hover:underline"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                </Link>
                                            </Button>
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