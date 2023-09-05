'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import {
    PostModel,
    QueryParamsSortFields,
    QueryParamsSortOrder
} from '@/types';
import usePosts from '@/client/api-calls/usePostsQuery';
import PostCard from './PostCard';
import Filters from './Filters';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PostsList({
    isUsedInPostsByUser
}: {
    isUsedInPostsByUser: boolean;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();

    const { data: session } = useSession();

    const initialSortBy = searchParams.get('sortBy') || 'createdAt';
    const initialSortOrder = searchParams.get('sortOrder') || 'desc';

    const [queryParams, setQueryParams] = useState({
        sortBy: initialSortBy,
        sortOrder: initialSortOrder
    });

    const { data, isLoading } = usePosts({
        sortBy: queryParams.sortBy,
        sortOrder: queryParams.sortOrder,
        isUsedInPostsByUser,
        userId: params?.id
    });

    useEffect(() => {
        const newSortBy = queryParams.sortBy || 'createdAt';
        const newSortOrder = queryParams.sortOrder || 'desc';
        setQueryParams({ sortBy: newSortBy, sortOrder: newSortOrder });

        isUsedInPostsByUser
            ? router.push(
                  `/posts-by-user/${params.id}?sortBy=${newSortBy}&sortOrder=${newSortOrder}`
              )
            : router.push(
                  `/posts?sortBy=${newSortBy}&sortOrder=${newSortOrder}`
              );
    }, [
        queryParams.sortBy,
        queryParams.sortOrder,
        router,
        isUsedInPostsByUser,
        params.id
    ]);

    if (isLoading) {
        return (
            <div className="flex justify-center w-screen px-5 py-5">
                Loading...
            </div>
        );
    }

    const sortBy = ({
        sortBy,
        sortOrder
    }: {
        sortBy: QueryParamsSortFields;
        sortOrder: QueryParamsSortOrder;
    }) => {
        setQueryParams({
            sortBy,
            sortOrder
        });
    };

    return (
        <div className="flex flex-wrap w-full">
            <div>
                {data?.posts?.length === 0 && !session && (
                    <div className="flex w-screen justify-center">
                        <span>
                            No posts found. Please create a new one by{' '}
                            <Link href={'/login'}> Login </Link> or{' '}
                            <Link href={'/register'}>Sign up</Link> with a
                            specific user
                        </span>
                    </div>
                )}
            </div>
            <div className="flex w-full justify-between">
                <div>
                    {data?.posts?.length > 0 && !isLoading && (
                        <>
                            <Filters
                                sortByEmitter={sortBy}
                                currentSortField={queryParams.sortBy}
                                currentSortOrder={queryParams.sortOrder}
                            />
                        </>
                    )}
                </div>
                <div>
                    {!!session && (
                        <button
                            type="button"
                            className="ml-6 bg-green-500 hover:text-white font-semibold py-2 px-4 border rounded"
                            onClick={() => router.push('/create-post')}
                        >
                            + New movie
                        </button>
                    )}
                </div>
            </div>
            {data?.posts?.length > 0 && !isLoading && (
                <div className="w-full">
                    {data?.posts?.map((post: PostModel) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
