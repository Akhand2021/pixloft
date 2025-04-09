import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { type BreadcrumbItem } from '@/types';
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";

interface Template {
    id: number;
    title: string;
    description: string;
    price: number;
    category_id: number;
    collection_id: number;
    template_type_id: number;
    category: Category;
    collection: Collection;
    template_type: TemplateType;
    file: File | null;
    preview_image: File | null;
}


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
    template: Template;
    categories: Category[];
    collections: Collection[];
    templateTypes: TemplateType[];
}



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Templates',
        href: '/admin/templates',
    },
    {
        title: 'Edit Template',
        href: '/admin/templates/edit',
    },
];

export default function EditTemplate({ template, categories, collections, templateTypes }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: template.title,
        description: template.description,
        price: template.price,
        category_id: template.category_id,
        collection_id: template.collection_id,
        template_type_id: template.template_type_id,
        category: template.category,
        collection: template.collection,
        template_type: template.template_type,
        file: null,
        preview_image: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/admin/templates/' + template.id, { forceFormData: true, });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Template" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Template</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full"
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-destructive">{errors.title}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full"
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
                                    value={data.price}
                                    onChange={(e) => setData('price', parseFloat(e.target.value))}
                                    className="w-full"
                                />
                                {errors.price && (
                                    <p className="text-sm text-destructive">{errors.price}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category_id">Category</Label>
                                <Select
                                    id="category_id"
                                    value={data.category_id}
                                    onValueChange={(value) => setData('category_id', parseInt(value))}
                                >
                                    <SelectTrigger>
                                        {categories && categories.length > 0 ? (
                                            categories.map((category) => (
                                                <SelectValue key={category.id} value={category.id} selected={category.id === data.category_id ? 'selected' : ''}>{category.name}</SelectValue>
                                            ))
                                        ) : (
                                            <SelectValue placeholder="Select a category" />
                                        )}
                                    </SelectTrigger>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="collection_id" data={data.collection_id}>Collection</Label>
                                <Select
                                    value={data.collection_id?.toString()}
                                    onValueChange={(value) => setData("collection_id", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a collection" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {collections && collections.length > 0 ? (
                                            collections.map((collection) => (
                                                <SelectItem key={collection.id} value={String(collection.id)}>
                                                    {collection.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem disabled value="">No collections found</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>

                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="template_type_id">Template Type</Label>
                                <Select
                                    id="template_type_id"
                                    value={data.template_type_id}
                                    onValueChange={(value) => setData('template_type_id', parseInt(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a template type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {templateTypes && templateTypes.length > 0 ? (
                                            templateTypes.map((templateType) => (
                                                <SelectItem key={templateType.id} value={templateType.id} selected={templateType.id === data.template_type_id ? 'selected' : ''}>{templateType.name}</SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem placeholder="Select a template type" > Select a template type </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="file">Template File (ZIP)</Label>
                                <Input
                                    id="file"
                                    type="file"
                                    onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                    className="w-full"
                                />
                                {errors.file && (
                                    <p className="text-sm text-destructive">{errors.file}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="preview_image">Preview Image</Label>
                                <Input
                                    id="preview_image"
                                    type="file"
                                    onChange={(e) => setData('preview_image', e.target.files?.[0] || null)}
                                    className="w-full"
                                />
                                {errors.preview_image && (
                                    <p className="text-sm text-destructive">{errors.preview_image}</p>
                                )}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}