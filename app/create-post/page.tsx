import React from 'react';
import CreatePostForm from '@/client/components/CreatePostForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function CreatePostPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        redirect('/');
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <div className="bg-white px-10 py-10 min-w-[500px]">
                <CreatePostForm />
            </div>
        </div>
    );
}
