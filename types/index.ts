import { Post, PostVote } from '@prisma/client';

export type PostModel = Post & {
    numberOfLikes: number;
    numberOfDislikes: number;
    votes: PostVote[];
    author: {
        name: string;
    };
};

export type QueryParamsSortFields =
    | 'createdAt'
    | 'numberOfLikes'
    | 'numberOfDislikes';

export type QueryParamsSortOrder = 'asc' | 'desc';

export type VoteResult = { message: string } | { error: unknown };
