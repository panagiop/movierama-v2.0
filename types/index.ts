import { Post, PostVote } from '@prisma/client';

export type PostModel = Post & {
    numberOfLikes: number;
    numberOfDislikes: number;
    votes: PostVote[];
    author: {
        name: string;
    };
    authorId?: number;
    createdAt: Date;
    content: string | null;
    title: string;
    id: number;
};

export type QueryParamsSortFields =
    | 'createdAt'
    | 'numberOfLikes'
    | 'numberOfDislikes';

export type QueryParamsSortOrder = 'asc' | 'desc';

export type VoteResult = { message: string } | { error: unknown };
