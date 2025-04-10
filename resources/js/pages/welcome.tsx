import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import WelcomeHeader from '@/components/welcome/header';
import WelcomeContent from '@/components/welcome/content';
import WelcomeFooter from '@/components/welcome/footer';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="PixLoft - Premium Templates Marketplace">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <WelcomeHeader />
                <WelcomeContent />
                <WelcomeFooter />
            </div>
        </>
    );
}
