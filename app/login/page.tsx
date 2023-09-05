import React from 'react';
import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth';
import LoginForm from '@/client/components/LoginForm';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function LoginPage() {
    const session = await getServerSession(authOptions);
    if (!!session) {
        redirect('/');
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="bg-white px-10 py-10 min-w-[500px]">
                <LoginForm />
            </div>
        </div>
    );
}
