import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { VoteResult } from '@/types';
import { GET } from '../route';
import { getUserById } from '@/services/users';
import { getPostById, likePost } from '@/services/posts';

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    try {
        const { error: hasGetUserByIdError } = await getUserById(
            (session?.user?.id).toString()
        );

        const { error: hasGetPostByIdError } = await getPostById(params?.id);

        if (!params?.id) {
            throw 'No post id provided';
        }

        if (hasGetUserByIdError) {
            throw hasGetUserByIdError;
        }

        if (hasGetPostByIdError) {
            throw hasGetPostByIdError;
        }

        const response = await GET(request, { params });
        const resolvedResponse = await response.json();

        if (response.status === 404) {
            return NextResponse.json(resolvedResponse, { status: 404 });
        }

        if (resolvedResponse.authorId === session?.user?.id) {
            return NextResponse.json(
                {
                    message:
                        'Users cannot vote for the posts they have submitted'
                },
                { status: 400 }
            );
        }

        const result: VoteResult = await likePost({
            postId: +params?.id,
            userId: session?.user?.id
        });

        if ('error' in result) {
            throw result.error;
        }

        return NextResponse.json({ message: result.message }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: error },
            {
                status: 500
            }
        );
    }
}
