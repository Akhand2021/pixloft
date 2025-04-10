import { Link } from '@inertiajs/react';

export default function WelcomeFooter() {
    return (
        <footer className="bg-gray-800 py-12 text-gray-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="mb-4 text-xl font-bold text-white">PixLoft</h3>
                        <p className="text-sm">
                            Premium templates marketplace for creative professionals and businesses.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href={route('templates')} className="hover:text-indigo-400">
                                    Templates
                                </Link>
                            </li>
                            <li>
                                <Link href={route('collections')} className="hover:text-indigo-400">
                                    Collections
                                </Link>
                            </li>
                            <li>
                                <Link href={route('templates-types')} className="hover:text-indigo-400">
                                    Categories
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-white">Support</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-indigo-400">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-indigo-400">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-indigo-400">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-white">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-indigo-400">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-indigo-400">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-indigo-400">
                                    License
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} PixLoft. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
} 