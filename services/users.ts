import { QueryParamsSortFields, QueryParamsSortOrder } from '@/types';
import { UserRepository } from '../repository/interfaces/UserRepository';
import { PrismaUserRepository } from '../repository/PrismaUserRepository';

const userRepository: UserRepository = new PrismaUserRepository();

export async function getPostsByUserId({
    userId,
    sortBy,
    sortOrder
}: {
    userId: number;
    sortBy: QueryParamsSortFields;
    sortOrder: QueryParamsSortOrder;
}) {
    try {
        const result = await userRepository.getPostsByUserId(
            userId,
            sortBy,
            sortOrder
        );
        if ('error' in result) {
            throw result.error;
        }
        return { posts: result.posts };
    } catch (error) {
        return { error };
    }
}

export async function getUserById(id: number) {
    try {
        const result = await userRepository.getUserById(id);
        if ('error' in result) {
            throw result.error;
        }
        return { user: result.user };
    } catch (error) {
        return { error };
    }
}

export async function getUserByEmail(email: string) {
    try {
        const result = await userRepository.getUserByEmail(email);
        if ('error' in result) {
            throw result.error;
        }
        return { user: result.user };
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
        const result = await userRepository.createUser({
            name,
            email,
            password
        });

        if ('error' in result) {
            throw result.error;
        }
        return { newUser: result.newUser };
    } catch (error) {
        return { error };
    }
}
