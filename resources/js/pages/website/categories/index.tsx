import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import WelcomeHeader from '@/components/welcome/header';
import WelcomeFooter from '@/components/welcome/footer';
interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface Props {
    categories: Category[];
}



export default function CategoryIndex({ categories }: Props) {
    return (
        <>
            <Head title="Categories" />
            <div className="bg-slate-900 min-h-screen text-white">
                {/* Hero Header */}
                <section className="px-6 py-12 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Discover Product Categories</h1>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                        Browse through curated collections of templates crafted to boost your next project.
                    </p>
                </section>

                {/* Category Grid */}
                <section className="px-6 pb-12">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="bg-slate-800 hover:bg-slate-700 transition-all rounded-xl overflow-hidden shadow-lg flex flex-col justify-between"
                            >
                                <div className="p-5">
                                    <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                                    {category.description && (
                                        <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                                            {category.description}
                                        </p>
                                    )}
                                </div>
                                <div className="px-5 pb-5 mt-auto">
                                    <Link
                                        href={`/categories/${category.slug}`}
                                        className="inline-block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                    >
                                        View Templates
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <WelcomeFooter />
            </div>
        </>
    );
}

