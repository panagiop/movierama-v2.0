import React from 'react';
import PostsList from '@/client/components/PostsList';

export default async function PostsByUserPage() {
    return (
        <div className="flex flex-wrap w-screen px-5 py-5">
            <PostsList isUsedInPostsByUser={false} />
        </div>
    );
}
