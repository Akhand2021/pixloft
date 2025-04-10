import { type SharedData } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import WelcomeHeader from '@/components/welcome/header';
import WelcomeFooter from '@/components/welcome/footer';
interface Template {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    preview_image: string;
    created_at: string;
}

interface Props {
    templates: Template[];
}

export default function TemplatesIndex({ templates }: Props) {
    return (
        <>
            <WelcomeHeader />
            <Head title="Templates" />
            <div className="relative isolate overflow-hidden bg-slate-100 dark:bg-slate-900 py-24 sm:py-32 lg:px-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                            Premium Templates
                        </h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
                            Browse our collection of high-quality templates for your next project
                        </p>
                    </div>
                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {templates.map((template) => (
                            <Link
                                key={template.id}
                                href={`/templates/${template.slug}`}
                                className="group"
                            >
                                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
                                    {template.preview_image ? (
                                        <img
                                            src={`storage/${template.preview_image}`}
                                            alt={template.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    ) : (
                                        <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-blue-500 to-indigo-600" />
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600">
                                            {template.title}
                                        </h3>
                                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                                            {template.description}
                                        </p>
                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                                                ${Number(template.price).toFixed(2)}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                View Details
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <WelcomeFooter />
        </>
    );
} 