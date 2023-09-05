import {
    PostModel,
    QueryParamsSortFields,
    QueryParamsSortOrder
} from '@/types';

export interface PostRepository {
    getPosts(
        sortBy: QueryParamsSortFields,
        sortOrder: QueryParamsSortOrder
    ): Promise<{ posts: PostModel[] } | { error: unknown }>;

    createPost(
        post: { title: string; content: string },
        userId: number
    ): Promise<{ newPost: PostModel } | { error: unknown }>;

    getPostById(id: number): Promise<{ post: PostModel } | { error: unknown }>;

    likePost(
        postId: number,
        userId: number
    ): Promise<{ message: string } | { error: unknown }>;

    dislikePost(
        postId: number,
        userId: number
    ): Promise<{ message: string } | { error: unknown }>;
}
