import { type SharedData } from '@/types';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import WelcomeHeader from '@/components/welcome/header';
import WelcomeFooter from '@/components/welcome/footer';

interface Collection {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
}

interface Props {
    collections: Collection[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Collections',
        href: '/collections',
    },
];

export default function CollectionsIndex({ collections }: Props) {
    return (
        <>
            <Head title="Collections" />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <WelcomeHeader />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                            Our Collections
                        </h1>
                        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
                            Discover our carefully curated collections of premium templates
                        </p>
                    </div>

                    <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {collections.map((collection) => (
                            <Link 
                                key={collection.id} 
                                href={`/collections/${collection.slug}`}
                                className="group"
                            >
                                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105">
                                    <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-blue-500 to-purple-600" />
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600">
                                            {collection.name}
                                        </h3>
                                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                                            {collection.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <WelcomeFooter />
            </div>
        </>
    );
}
