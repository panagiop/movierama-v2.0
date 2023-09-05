import {
    PostModel,
    QueryParamsSortFields,
    QueryParamsSortOrder
} from '@/types';
import { prisma } from '../db/prisma';

export async function getPosts({
    sortBy,
    sortOrder
}: {
    sortBy: QueryParamsSortFields;
    sortOrder: QueryParamsSortOrder;
}) {
    if (
        sortBy !== 'createdAt' &&
        sortBy !== 'numberOfLikes' &&
        sortBy !== 'numberOfDislikes'
    ) {
        return { posts: [] };
    }

    if (sortOrder !== 'asc' && sortOrder !== 'desc') {
        return { posts: [] };
    }

    try {
        const posts = (await prisma.post.findMany({
            include: {
                votes: true,
                author: { select: { name: true } }
            },
            orderBy: {
                [sortBy]: sortOrder
            }
        })) as PostModel[];

        return { posts };
    } catch (error) {
        return { error };
    }
}

export async function createPost(
    post: { title: string; content: string },
    userId: number
) {
    try {
        const { title, content } = post;

        const foundPost = await prisma.post.findFirst({
            where: {
                title
            }
        });

        if (foundPost) {
            throw 'There is already a post with this title';
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                author: {
                    connect: {
                        id: +userId
                    }
                },
                numberOfDislikes: 0,
                numberOfLikes: 0
            }
        });
        return { newPost };
    } catch (error) {
        return { error };
    }
}

export async function getPostById(id: string) {
    if (!id) {
        throw `No post id provided`;
    }

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: +id
            }
        });

        if (!post) {
            throw `No post found with id: ${id}`;
        }

        return { post };
    } catch (error) {
        return { error };
    }
}

export async function likePost({
    postId,
    userId
}: {
    postId: number;
    userId: number;
}) {
    try {
        const postAlreadyLiked = await prisma.postVote.findFirst({
            where: {
                postId: +postId,
                userId: +userId,
                value: { equals: 1 }
            }
        });

        if (postAlreadyLiked) {
            throw 'You have already liked this post!';
        }

        return await prisma.$transaction(async (tx) => {
            await tx.postVote.upsert({
                where: {
                    postId_userId: {
                        postId: +postId,
                        userId: +userId
                    }
                },
                update: {
                    value: 1
                },
                create: {
                    postId: +postId,
                    userId: +userId,
                    value: 1
                }
            });

            const numberOfLikes = await tx.postVote.count({
                where: {
                    postId: +postId,
                    value: { equals: 1 }
                }
            });

            const numberOfDislikes = await tx.postVote.count({
                where: {
                    postId: +postId,
                    value: { equals: -1 }
                }
            });

            await tx.post.update({
                where: {
                    id: postId
                },
                data: {
                    numberOfLikes,
                    numberOfDislikes
                }
            });
            return { message: 'thanks for voting!' };
        });
    } catch (error) {
        return { error };
    }
}

export async function dislikePost({
    postId,
    userId
}: {
    postId: number;
    userId: number;
}) {
    try {
        const postAlreadyDisliked = await prisma.postVote.findFirst({
            where: {
                postId: +postId,
                userId: +userId,
                value: { equals: -1 }
            }
        });

        if (postAlreadyDisliked) {
            throw 'You have already disliked this post!';
        }

        return await prisma.$transaction(async (tx) => {
            await tx.postVote.upsert({
                where: {
                    postId_userId: {
                        postId: +postId,
                        userId: +userId
                    }
                },
                update: {
                    value: -1
                },
                create: {
                    postId: +postId,
                    userId: +userId,
                    value: -1
                }
            });

            const numberOfLikes = await tx.postVote.count({
                where: {
                    postId: +postId,
                    value: { equals: 1 }
                }
            });

            const numberOfDislikes = await tx.postVote.count({
                where: {
                    postId: +postId,
                    value: { equals: -1 }
                }
            });

            await tx.post.update({
                where: {
                    id: postId
                },
                data: {
                    numberOfLikes,
                    numberOfDislikes
                }
            });
            return { message: 'thanks for voting!' };
        });
    } catch (error) {
        return { error };
    }
}
