import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { AlertMessage } from '@/components/ui/alert-message';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
interface TemplateType {
    id: number;
    title: string;
    slug: string;
    created_at: string;
}

interface Props {
    templateTypes: TemplateType[];
    status?: {
        type: 'success' | 'error';
        message: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Templates Types',
        href: '/admin/templates-types',
    },
    {
        title: 'Admin',
        href: '/admin/template-types',
    },
];

export default function TemplateTypeIndex({ templateTypes, status }: Props) {
    const { flash } = usePage<Props>().props;
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (flash.success) {
            setSuccessMessage(flash.success);
            setShowSuccess(true);
        }
    }, [flash.success]);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this template type?')) {
            router.delete(`/admin/templates-types/${id}`);
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Template Types" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {showSuccess && (
                    <AlertMessage
                        variant="success"
                        message={successMessage}
                        show={showSuccess}
                        setShow={setShowSuccess}
                    />
                )}
                {showError && (
                    <AlertMessage
                        variant="error"
                        message={errorMessage}
                        show={showError}
                        setShow={setShowError}
                    />
                )}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardHeader>
                                <CardTitle>Template Types</CardTitle>
                            </CardHeader>
                        </div>
                        <Button asChild>
                            <Link href="/admin/templates-types/create">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Template Type
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {templateTypes.map((templateType) => (
                                    <TableRow key={templateType.id}>
                                        <TableCell>
                                            <Link href={`/admin/templates-types/${templateType.id}`}>
                                                {templateType.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{templateType.slug}</TableCell>
                                        <TableCell>{new Date(templateType.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="icon" asChild>
                                                <Link href={`/admin/templates-types/${templateType.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button className='ml-2' variant="outline" size="icon" onClick={() => handleDelete(templateType.id)}   >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout >
    );
}
