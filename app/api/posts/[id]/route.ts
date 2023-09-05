import { NextResponse } from 'next/server';
import { getPostById } from '@/services/posts';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { post, error } = await getPostById(params?.id);

        if (error) {
            throw error;
        }

        return NextResponse.json(
            {
                postId: post?.id,
                title: post?.title,
                content: post?.content,
                authorId: post?.authorId
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: error },
            {
                status: 500
            }
        );
    }
}
