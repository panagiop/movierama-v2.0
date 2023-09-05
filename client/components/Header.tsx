'use client';

import React from 'react';
import Link from 'next/link';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
    const router = useRouter();

    const { data: session } = useSession();

    return (
        <nav className="flex text-white border-gray-200 dark:bg-gray-800 w-full px-4 py-4 items-center justify-center">
            <ul className="flex w-full items-center justify-between">
                <li>
                    <span
                        className="hover:text-blue-400 hover:cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        MovieRama 2.0
                    </span>
                </li>
                {!!session ? (
                    <li className="mr-6">
                        <>
                            <span className="mr-4">
                                Welcome back{' '}
                                <Link
                                    href={`/posts-by-user/${session.user?.id}`}
                                >
                                    <span className="hover:text-blue-400 font-semibold text-white">
                                        {session.user?.name}
                                    </span>
                                </Link>
                            </span>
                            <button
                                type="button"
                                className="bg-transparent bg-blue-500 hover:text-blue-400 font-semibold text-white py-2 px-4 border hover:border-white rounded"
                                onClick={() => signOut()}
                            >
                                Logout
                            </button>
                        </>
                    </li>
                ) : (
                    <li className="mr-6">
                        <>
                            <Link href={'/login'}>
                                <span className="hover:text-blue-400 font-semibold text-white">
                                    Login
                                </span>
                            </Link>
                            <span className="ml-2 mr-2">or</span>
                            <button
                                type="button"
                                className="bg-transparent bg-blue-500 hover:text-blue-400 font-semibold text-white py-2 px-4 border hover:border-white rounded"
                                onClick={() => router.push('/register')}
                            >
                                Sign up
                            </button>
                        </>
                    </li>
                )}
            </ul>
        </nav>
    );
}
