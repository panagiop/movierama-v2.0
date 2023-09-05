import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { createPost, getPosts } from '@/services/posts';
import { authOptions } from '../auth/[...nextauth]/route';
import { QueryParamsSortFields, QueryParamsSortOrder } from '@/types';

import { CreateFormInput, CreateFormSchema } from '@/validations';

export async function GET(req: NextRequest) {
    try {
        const { posts, error } = await getPosts({
            sortBy: req.nextUrl.searchParams.get(
                'sortBy'
            ) as QueryParamsSortFields,
            sortOrder: req.nextUrl.searchParams.get(
                'sortOrder'
            ) as QueryParamsSortOrder
        });

        if (error) {
            throw error;
        }

        return NextResponse.json({ posts }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error
            },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    try {
        const { title, content } = (await req.json()) as CreateFormInput;

        const response = CreateFormSchema.safeParse({ title, content });

        if (!response.success) {
            const { errors } = response.error;
            throw errors;
        }

        const { newPost: post, error } = await createPost(
            { title, content },
            session?.user?.id
        );

        if (error) {
            throw error;
        }

        return NextResponse.json({ post }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error
            },
            { status: 500 }
        );
    }
}
