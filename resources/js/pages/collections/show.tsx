import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Template {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    preview_image: string;
    created_at: string;
}

interface Collection {
    id: number;
    name: string;
    slug: string;
    description: string;
    templates: Template[];
}

interface Props {
    collection: Collection;
}

export default function CollectionShow({ collection }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Collections',
            href: '/collections',
        },
        {
            title: collection.name,
            href: `/collections/${collection.slug}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${collection.name} - Templates`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{collection.name}</CardTitle>
                        <CardDescription>{collection.description}</CardDescription>
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
                                {collection.templates.map((template) => (
                                    <TableRow key={template.id}>
                                        <TableCell>
                                            <Link 
                                                href={`/templates/${template.slug}`}
                                                className="font-medium text-primary hover:underline"
                                            >
                                                {template.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{template.description}</TableCell>
                                        <TableCell>${template.price.toFixed(2)}</TableCell>
                                        <TableCell>{new Date(template.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Link 
                                                href={`/templates/${template.slug}`}
                                                className="text-sm text-primary hover:underline"
                                            >
                                                View Details
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