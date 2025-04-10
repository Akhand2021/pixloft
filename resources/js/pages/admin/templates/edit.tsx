import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { type BreadcrumbItem } from '@/types';
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select";
import { CloudCog } from "lucide-react";

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

interface FormData {
    title: string;
    description: string;
    price: number;
    category_id: number;
    collection_id: number;
    template_type_id: number;
    file: File | null;
    preview_image: File | null;
    [key: string]: string | number | File | null;
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
    const { data, setData, processing, errors } = useForm<FormData>({
        title: template.title,
        description: template.description,
        price: template.price,
        category_id: template.category_id,
        collection_id: template.collection_id,
        template_type_id: template.template_type_id,
        file: null,
        preview_image: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        if (data.title){
         formData.append('title', data.title);
        }else{
            console.log('no title')
        }
        if (data.description) formData.append('description', data.description);
        if (data.price) formData.append('price', String(data.price));
        if (data.category_id) formData.append('category_id', String(data.category_id));
        if (data.collection_id) formData.append('collection_id', String(data.collection_id));
        if (data.template_type_id) formData.append('template_type_id', String(data.template_type_id));
        
        if (data.file) formData.append('file', data.file);
        if (data.preview_image) formData.append('preview_image', data.preview_image);

        formData.append('_method', 'PUT');
        
        router.post(`/admin/templates/${template.id}`, formData, {
            forceFormData: true,
            preserveScroll: true
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'file' | 'preview_image') => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setData(field, file);
        } else {
            setData(field, null);
        }
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
                        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={String(data.title || '')}
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
                                    value={String(data.description || '')}
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
                                    value={Number(data.price || 0)}
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
                                    value={String(data.category_id || '')}
                                    onValueChange={(value) => setData('category_id', parseInt(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories && categories.length > 0 ? (
                                            categories.map((category) => (
                                                <SelectItem key={category.id} value={String(category.id)}>
                                                    {category.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem disabled value="">No categories found</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="collection_id">Collection</Label>
                                <Select
                                    value={String(data.collection_id || '')}
                                    onValueChange={(value) => setData("collection_id", parseInt(value))}
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
                                    value={String(data.template_type_id || '')}
                                    onValueChange={(value) => setData('template_type_id', parseInt(value))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a template type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {templateTypes && templateTypes.length > 0 ? (
                                            templateTypes.map((templateType) => (
                                                <SelectItem key={templateType.id} value={String(templateType.id)}>
                                                    {templateType.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem disabled value="">No template types found</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="file">Template File (ZIP)</Label>
                                <Input
                                    id="file"
                                    type="file"
                                    accept=".zip"
                                    onChange={(e) => handleFileChange(e, 'file')}
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
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'preview_image')}
                                    className="w-full"
                                />
                                {errors.preview_image && (
                                    <p className="text-sm text-destructive">{errors.preview_image}</p>
                                )}
                                {template.preview_image && (
                                    <img src={`/storage/${template.preview_image}`} className="h-40 object-cover" alt="Preview" />
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