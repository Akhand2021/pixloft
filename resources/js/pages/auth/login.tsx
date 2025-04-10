import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Sign in to your account" description="Welcome back! Please enter your credentials.">
            <Head title="Login" />

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-4">
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
                            autoFocus
                            required
                            className="focus:border-gray-500  focus:ring-gray-500 border-gray-100"
                            placeholder="you@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-gray-700 dark:text-white">
                                Password
                            </Label>
                            {canResetPassword && (
                                <TextLink
                                    href={route('password.request')}
                                    className="text-sm text-gray-500 hover:text-gray-500 dark:text-white dark:hover:text-gray-300"
                                >
                                    Forgot?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            autoComplete="current-password"
                            required
                            className="focus:border-gray-500  focus:ring-gray-500 border-gray-100"
                            placeholder="••••••••"
                        />
                        <InputError message={errors.password} />
                    </div>

                    {/* Remember me */}
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            className="border-geay-400 text-gray-600"
                        />
                        <Label htmlFor="remember" className="text-sm text-muted-foreground">
                            Remember me
                        </Label>
                    </div>
                </div>

                {/* Submit button */}
                <Button
                    type="submit"
                    className="w-full bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 dark:text-white"
                    disabled={processing}
                >
                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                    Log in
                </Button>

                {/* Status message */}
                {status && (
                    <div className="text-sm text-center text-green-600 font-medium bg-green-100 dark:bg-green-900/30 py-2 rounded">
                        {status}
                    </div>
                )}

                {/* Register prompt */}
                <p className="text-sm text-center text-gray-400">
                    Don’t have an account?{' '}
                    <TextLink
                        href={route('register')}
                        className="text-gray-600 hover:underline dark:text-white"
                    >
                        Sign up
                    </TextLink>
                </p>
            </form>
        </AuthLayout>
    );
}
