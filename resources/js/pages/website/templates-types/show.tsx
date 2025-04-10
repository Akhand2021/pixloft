import { type SharedData } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

interface Template {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    thumbnail: string;
    created_at: string;
}

interface TemplateType {
    id: number;
    name: string;
    slug: string;
    description: string;
    templates: Template[];
}

interface Props {
    templateType: TemplateType;
}

export default function TemplateTypeShow({ templateType }: Props) {
    return (
        <>
            <Head title={`${templateType.name} Templates`} />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                            {templateType.name}
                        </h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            {templateType.description}
                        </p>
                    </div>

                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {templateType.templates.map((template) => (
                            <Link 
                                key={template.id} 
                                href={`/templates/${template.slug}`}
                                className="group"
                            >
                                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
                                    {template.thumbnail ? (
                                        <img 
                                            src={template.thumbnail} 
                                            alt={template.name} 
                                            className="w-full h-48 object-cover"
                                        />
                                    ) : (
                                        <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-blue-500 to-indigo-600" />
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600">
                                            {template.name}
                                        </h3>
                                        <p className="mt-2 text-gray-500">
                                            {template.description}
                                        </p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-lg font-semibold text-indigo-600">
                                                ${Number(template.price).toFixed(2)}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                View Details
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {templateType.templates.length === 0 && (
                        <div className="text-center mt-16">
                            <h3 className="text-xl text-gray-600">
                                No templates available in this category yet.
                            </h3>
                            <Link 
                                href={route('templates-types')}
                                className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
                            >
                                Browse other categories
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
} 