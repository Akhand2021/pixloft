import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

interface Template {
    id: number;
    title: string;
    description: string;
    price: number;
    category: Category;
    collection: Collection;
    template_type: TemplateType;
    file_path: string;
    preview_image: string;
}

interface Props {
    template: Template;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Templates",
        href: "/admin/templates",
    },
    {
        title: "Show Template",
        href: "/admin/templates/show",
    },
];

export default function ShowTemplate({ template }: Props) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card>
                <CardHeader>
                    <CardTitle>Show Template</CardTitle>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Template Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Title </Label>
                            <Input value={template.title} disabled className="bg-gray-100 text-slate-950" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Description</Label>
                            <Input value={template.description} disabled className="bg-gray-100 text-slate-950" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Price</Label>
                            <Input value={template.price} disabled className="bg-gray-100 text-slate-950" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Category</Label>
                            <Input value={template.category.name} disabled className="bg-gray-100 text-slate-950" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Collection</Label>
                            <Input value={template.collection.name} disabled className="bg-gray-100 text-slate-950" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Template Type</Label>
                            <Input value={template.template_type?.name} disabled className="bg-gray-100 text-slate-950" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>File</Label>
                            <Input value={template.file_path} disabled className="bg-gray-100 text-slate-950" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Preview Image</Label>
                            <img
                                src={`/storage/${template.preview_image}`}
                                alt="Preview Image"
                                className="bg-gray-100 text-slate-950 rounded-md shadow-md w-60 h-auto"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
