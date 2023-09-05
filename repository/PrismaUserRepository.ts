import { prisma } from '../db/prisma';
import {
    QueryParamsSortFields,
    QueryParamsSortOrder,
    PostModel
} from '@/types';
import { UserRepository } from './interfaces/UserRepository';
import { createHash } from 'crypto';

export class PrismaUserRepository implements UserRepository {
    async getPostsByUserId(
        userId: number,
        sortBy: QueryParamsSortFields,
        sortOrder: QueryParamsSortOrder
    ) {
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
            const { error } = await this.getUserById(userId);

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

    async getUserById(id: number) {
        try {
            if (!id) {
                throw 'No id found';
            }
            const user = await prisma.user.findFirst({
                where: {
                    id: +id
                }
            });

            if (!user) {
                throw 'No valid user found';
            }

            return { user };
        } catch (error) {
            return { error };
        }
    }

    async getUserByEmail(email: string) {
        try {
            if (!email) {
                throw 'No email found';
            }
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

    async createUser({
        name,
        email,
        password
    }: {
        name: string;
        email: string;
        password: string;
    }) {
        try {
            const { user } = await this.getUserByEmail(email);

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
}
