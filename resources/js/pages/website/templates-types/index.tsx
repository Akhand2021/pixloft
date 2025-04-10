import { type SharedData } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

interface TemplateType {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
}

interface Props {
    templateTypes: TemplateType[];
}

export default function TemplateTypesIndex({ templateTypes }: Props) {
    return (
        <>
            <Head title="Template Categories" />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                            Template Categories
                        </h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                            Browse our templates by category to find exactly what you need
                        </p>
                    </div>

                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {templateTypes.map((type) => (
                            <Link 
                                key={type.id} 
                                href={`/templates-types/${type.slug}`}
                                className="group"
                            >
                                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
                                    <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-indigo-500 to-purple-600" />
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600">
                                            {type.name}
                                        </h3>
                                        <p className="mt-2 text-gray-500">
                                            {type.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
} 