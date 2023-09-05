import { NextResponse } from 'next/server';

import { createUser } from '@/services/users';
import { RegisterUserInput, RegisterUserSchema } from '@/validations';

export async function POST(req: Request) {
    try {
        const { name, email, password } =
            (await req.json()) as RegisterUserInput;

        const response = RegisterUserSchema.safeParse({
            name,
            email,
            password
        });

        if (!response.success) {
            const { errors } = response.error;
            throw errors;
        }

        const { newUser, error } = await createUser({
            name,
            email,
            password
        });

        if (error) {
            throw error;
        }

        return NextResponse.json(
            {
                user: {
                    id: newUser?.id,
                    name: newUser?.name,
                    email: newUser?.email
                }
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                message: error
            },
            { status: 500 }
        );
    }
}
