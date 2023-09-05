import { NextRequest, NextResponse } from 'next/server';
import { getPostsByUserId } from '@/services/users';
import { QueryParamsSortFields, QueryParamsSortOrder } from '@/types';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const { posts, error } = await getPostsByUserId({
            userId: params?.id,
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
