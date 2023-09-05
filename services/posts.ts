import { QueryParamsSortFields, QueryParamsSortOrder } from '@/types';
import { PrismaPostRepository } from '../repositories/PrismaPostRepository';
import { PostRepository } from '../repositories/interfaces/PostRepository';

const postRepository: PostRepository = PrismaPostRepository();

export async function getPosts({
    sortBy,
    sortOrder
}: {
    sortBy: QueryParamsSortFields;
    sortOrder: QueryParamsSortOrder;
}) {
    try {
        const result = await postRepository.getPosts(sortBy, sortOrder);
        if ('error' in result) {
            throw result.error;
        }
        return { posts: result.posts };
    } catch (error) {
        return { error };
    }
}

export async function createPost(
    post: { title: string; content: string },
    userId: number
) {
    try {
        const result = await postRepository.createPost(post, userId);
        if ('error' in result) {
            throw result.error;
        }
        return { newPost: result.newPost };
    } catch (error) {
        return { error };
    }
}

export async function getPostById(id: number) {
    try {
        const result = await postRepository.getPostById(id);
        if ('error' in result) {
            throw result.error;
        }
        return { post: result.post };
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
        const result = await postRepository.likePost(postId, userId);
        if ('error' in result) {
            throw result.error;
        }
        return { message: result.message };
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
        const result = await postRepository.dislikePost(postId, userId);
        if ('error' in result) {
            throw result.error;
        }
        return { message: result.message };
    } catch (error) {
        return { error };
    }
}
