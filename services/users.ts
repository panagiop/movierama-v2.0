import {
    PostModel,
    QueryParamsSortFields,
    QueryParamsSortOrder
} from '@/types';
import { prisma } from '../db/prisma';
import { createHash } from 'crypto';

export async function getPostsByUserId({
    userId,
    sortBy,
    sortOrder
}: {
    userId: string;
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
        const { error } = await getUserById(userId);

        if (error) {
            throw error;
        }

        const posts = (await prisma.post.findMany({
            include: {
                votes: true,
                author: { select: { name: true } }
            },
            where: {
                author: { id: +userId }
            },
            orderBy: {
                [sortBy]: sortOrder
            }
        })) as PostModel[];

        if (!posts?.length) {
            throw `No posts found for user id: ${userId}`;
        }

        return { posts };
    } catch (error) {
        return { error };
    }
}

export async function getUserById(id: string) {
    if (!id) {
        throw 'No id found';
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                id: +id
            },
            select: { name: true, id: true, email: true }
        });

        if (!user) {
            throw 'No valid user found';
        }

        return { user };
    } catch (error) {
        return { error };
    }
}

export async function getUserByEmail(email: string) {
    if (!email) {
        throw 'No email found';
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw 'No user found';
        }

        return { user };
    } catch (error) {
        return { error };
    }
}

export async function createUser({
    name,
    email,
    password
}: {
    name: string;
    email: string;
    password: string;
}) {
    try {
        const { user } = await getUserByEmail(email);

        if (user) {
            throw 'User already exists';
        }

        const hashedPassword = createHash('sha256')
            .update(password)
            .digest('hex');

        const newUser = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashedPassword
            }
        });

        return { newUser };
    } catch (error) {
        return { error };
    }
}
