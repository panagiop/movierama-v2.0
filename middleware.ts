import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    if (!token && (req.method === 'PUT' || req.method === 'POST')) {
        return NextResponse.json(
            { message: 'You are unauthorized' },
            { status: 401 }
        );
    }
    return NextResponse.next();
}

export const config = { matcher: ['/', '/api/posts/:path*'] };
