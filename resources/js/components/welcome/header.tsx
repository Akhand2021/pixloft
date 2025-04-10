import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function WelcomeHeader() {
    const { auth } = usePage<SharedData>().props;

    return (
        <nav className=" mx-auto px-4 py-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Link href={'/'} className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"><img src="/logo.png" alt="PixLoft" width={100} height={100} className="" /></Link>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <Link href={route('collections')} className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
                        Collections
                    </Link>
                    <Link href={route('templates')} className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
                        Templates
                    </Link>
                    <Link href={route('categories')} className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
                        Categories
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        >
                            My Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
} 