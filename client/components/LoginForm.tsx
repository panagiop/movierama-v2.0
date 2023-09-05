'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

export default function LoginForm() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<{
        email: string;
        password: string;
    }>({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await signIn('credentials', {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                callbackUrl
            });

            setLoading(false);

            if (!res?.error) {
                router.push('/posts?sortBy=numberOfLikes&sortOrder=asc');
            } else {
                setError('invalid email or password');
            }
        } catch (err: any) {
            setLoading(false);
            setError(err);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const inputStyle =
        'w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

    return (
        <>
            <form
                onSubmit={onSubmit}
                className="px-10 py-10 border border-solid border-gray-200 rounded"
            >
                {error && (
                    <p className="text-white text-center bg-red-400 py-4 mb-6 rounded">
                        {error}
                    </p>
                )}
                <div className="mb-6">
                    <input
                        required
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="Email address"
                        className={`${inputStyle}`}
                    />
                </div>
                <div className="mb-6">
                    <input
                        required
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className={`${inputStyle}`}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: `${loading ? '#ccc' : '#3446eb'}`
                    }}
                    className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    disabled={loading}
                >
                    {loading ? 'loading...' : 'Sign In'}
                </button>
            </form>
            <div className="flex justify-center items-center mt-4">
                Don&apos;t have an account yet? &nbsp;
                <a href="/register">Sign up here</a>
            </div>
        </>
    );
}
