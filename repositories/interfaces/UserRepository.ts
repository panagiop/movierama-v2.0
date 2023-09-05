import {
    QueryParamsSortFields,
    QueryParamsSortOrder,
    PostModel
} from '@/types';
import { User } from '@prisma/client';

export interface UserRepository {
    getPostsByUserId(
        userId: number,
        sortBy: QueryParamsSortFields,
        sortOrder: QueryParamsSortOrder
    ): Promise<{ posts: PostModel[] } | { error: unknown }>;

    getUserById(id: number): Promise<{ user: User } | { error: unknown }>;

    getUserByEmail(email: string): Promise<{ user: User } | { error: unknown }>;

    createUser({
        name,
        email,
        password
    }: {
        name: string;
        email: string;
        password: string;
    }): Promise<{ newUser: User } | { error: unknown }>;
}
