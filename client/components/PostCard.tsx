'use client';

import React, { useMemo } from 'react';

import { useSession } from 'next-auth/react';
import { PostModel } from '@/types';
import useLikePostMutation from '@/client/api-calls/useLikePostMutation';
import useDislikePostMutation from '@/client/api-calls/useDislikePostMutation';
import Spinner from './Spinner';
import Link from 'next/link';
import ElapsedTime from './ElapsedTime';

export default function PostCard({ post }: { post: PostModel }) {
    const { mutate: likeMutate, isLoading: isLikeMutationLoading } =
        useLikePostMutation();
    const { mutate: dislikeMutate, isLoading: isDisLikeMutationLoading } =
        useDislikePostMutation();
    const { data: session } = useSession();

    const isPostAlreadyLiked = useMemo(
        () =>
            post.votes.filter(
                (vote) => vote.userId === session?.user?.id && vote.value === 1
            ).length > 0,
        [post, session]
    );

    const isPostAlreadyDisliked = useMemo(
        () =>
            post.votes.filter(
                (vote) => vote.userId === session?.user?.id && vote.value === -1
            ).length > 0,
        [post, session]
    );

    return (
        <div className="rounded overflow-hidden border border-gray-200 mx-6 my-5">
            <div className="px-6 py-6">
                <p className="font-bold text-xl mb-2">{post.title}</p>
                <div className="flex">
                    <i>
                        Posted by:{' '}
                        <Link href={`/posts-by-user/${post.authorId}`}>
                            {post.author.name}
                        </Link>
                    </i>
                    <div className="ml-4">
                        <ElapsedTime startDate={post.createdAt} />
                    </div>
                </div>
                <p className="text-gray-700 text-base">{post.content}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                {session && session.user?.id !== post?.authorId ? (
                    <>
                        <button
                            disabled={
                                isPostAlreadyLiked || isLikeMutationLoading
                            }
                            type="button"
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:enabled:bg-blue-200 disabled:opacity-40"
                            onClick={() => likeMutate(post?.id)}
                        >
                            {isLikeMutationLoading ? (
                                <div className="flex items-center justify-center w-[40px] h-[22px]">
                                    <Spinner
                                        circleWidthInPx={15}
                                        circleHeightInPx={15}
                                    />
                                </div>
                            ) : (
                                <>
                                    <span>{post?.numberOfLikes}</span>
                                    <span>
                                        {+post?.numberOfLikes === 1
                                            ? ' like'
                                            : ' likes'}
                                    </span>
                                </>
                            )}
                        </button>
                        <button
                            disabled={
                                isPostAlreadyDisliked ||
                                isDisLikeMutationLoading
                            }
                            type="button"
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:enabled:bg-blue-200 disabled:opacity-40"
                            onClick={() => dislikeMutate(post?.id)}
                        >
                            {isDisLikeMutationLoading ? (
                                <div className="flex items-center justify-center w-[40px] h-[22px]">
                                    <Spinner
                                        circleWidthInPx={15}
                                        circleHeightInPx={15}
                                    />
                                </div>
                            ) : (
                                <>
                                    <span>{post?.numberOfDislikes}</span>
                                    <span>
                                        {+post?.numberOfDislikes === 1
                                            ? ' hate'
                                            : ' hates'}
                                    </span>
                                </>
                            )}
                        </button>
                    </>
                ) : (
                    <>
                        <span className="inline-block mr-2">
                            {+post?.numberOfLikes}{' '}
                            {+post?.numberOfLikes === 1 ? ' Like' : ' Likes'}
                        </span>
                        <span className="inline-block mr-2">
                            {+post?.numberOfDislikes}{' '}
                            {+post?.numberOfDislikes === 1 ? ' Hate' : ' Hates'}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}
