import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout
            title="Create your account"
            description="Sign up to access your dashboard and features."
        >
            <Head title="Register" />

            <form className="space-y-6" onSubmit={submit}>
                <div className="space-y-4">
                    {/* Name */}
                    <div>
                        <Label htmlFor="name" className="text-gray-700 dark:text-white">
                            Name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            autoComplete="name"
                            required
                            disabled={processing}
                            placeholder="John Doe"
                            className="focus:border-gray-500 border-gray-100 focus:ring-gray-500 border-gray-100"
                        />
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    {/* Email */}
                    <div>
                        <Label htmlFor="email" className="text-gray-700 dark:text-white">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoComplete="email"
                            required
                            disabled={processing}
                            placeholder="you@example.com"
                            className="focus:border-gray-500  focus:ring-gray-500 border-gray-100"
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    {/* Password */}
                    <div>
                        <Label htmlFor="password" className="text-gray-700 dark:text-white">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            autoComplete="new-password"
                            required
                            disabled={processing}
                            placeholder="••••••••"
                            className="focus:border-gray-500  focus:ring-gray-500 border-gray-100"
                        />
                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <Label htmlFor="password_confirmation" className="text-gray-700 dark:text-white">
                            Confirm Password
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            autoComplete="new-password"
                            required
                            disabled={processing}
                            placeholder="Re-enter your password"
                            className="focus:border-gray-500  focus:ring-gray-500 border-gray-100"
                        />
                        <InputError message={errors.password_confirmation} className="mt-1" />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 mt-2"
                    disabled={processing}
                >
                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                </Button>

                <p className="text-sm text-center text-white">
                    Already have an account?{' '}
                    <TextLink
                        href={route('login')}
                        className="text-gray-700 hover:underline dark:text-white"
                    >
                        Log in
                    </TextLink>
                </p>
            </form>
        </AuthLayout>
    );
}
