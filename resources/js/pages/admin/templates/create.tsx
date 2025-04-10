import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';


interface Category {
    id: number;
    name: string;
}

interface Collection {
    id: number;
    name: string;
}
interface TemplateType {
    id: number;
    name: string;
}
interface Props {
    categories: Category[];
    collections: Collection[];
    templateTypes: TemplateType[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Templates',
        href: '/templates',
    },
    {
        title: 'Create Template',
        href: '#',
    },
];

export default function CreateTemplate({ categories, collections, templateTypes }: Props) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        price: '',
        category_id: '',
        collection_id: '',
        template_type_id: '',
        file: null as File | null,
        preview_image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('category_id', data.category_id);
        if (data.collection_id) {
            formData.append('collection_id', data.collection_id);
        }
        if (data.file) {
            formData.append('file', data.file);
        }
        if (data.preview_image) {
            formData.append('preview_image', data.preview_image);
        }

        post('/admin/templates', {
            data: formData,
            forceFormData: true,
        });
    };

    const handlePreviewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('preview_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Template" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Template</CardTitle>
                        <CardDescription>Add a new template to your collection</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4" enctype="multipart/form-data">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    required
                                />
                                {errors.price && (
                                    <p className="text-sm text-destructive">{errors.price}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={data.category_id}
                                    onValueChange={(value) => setData('category_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.category_id && (
                                    <p className="text-sm text-destructive">{errors.category_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="collection">Collection (Optional)</Label>
                                <Select
                                    value={data.collection_id}
                                    onValueChange={(value) => setData('collection_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a collection" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {collections.map((collection) => (
                                            <SelectItem key={collection.id} value={collection.id.toString()}>
                                                {collection.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.collection_id && (
                                    <p className="text-sm text-destructive">{errors.collection_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="template_type">Template Type</Label>
                                <Select
                                    value={data.template_type_id}
                                    onValueChange={(value) => setData('template_type_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a template type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {templateTypes.map((templateType) => (
                                            <SelectItem key={templateType.id} value={templateType.id.toString()}>
                                                {templateType.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.template_type_id && (
                                    <p className="text-sm text-destructive">{errors.template_type_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="file">Template File (ZIP)</Label>
                                <Input
                                    id="file"
                                    type="file"
                                    accept=".zip"
                                    onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                    required
                                />
                                <p className="text-sm text-muted-foreground">
                                    Maximum file size: 10MB. Accepted format: ZIP
                                </p>
                                {errors.file && (
                                    <p className="text-sm text-destructive">{errors.file}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="preview_image">Preview Image</Label>
                                <Input
                                    id="preview_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePreviewImageChange}
                                    required
                                />
                                <p className="text-sm text-muted-foreground">
                                    Maximum file size: 2MB. Accepted formats: JPEG, PNG, JPG, GIF
                                </p>
                                {previewImage && (
                                    <div className="mt-2">
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="max-w-xs rounded-lg border"
                                        />
                                    </div>
                                )}
                                {errors.preview_image && (
                                    <p className="text-sm text-destructive">{errors.preview_image}</p>
                                )}
                            </div>

                            <Button type="submit" disabled={processing}>
                                Create Template
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 