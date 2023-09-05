import { z } from 'zod';

export const RegisterUserSchema = z.object({
    name: z
        .string({
            required_error: 'Name is required'
        })
        .min(3, 'More than 2 characters required'),
    email: z
        .string({
            required_error: 'Email is required'
        })
        .min(1, 'Email is required')
        .email('Email is invalid'),
    password: z
        .string({
            required_error: 'Password is required'
        })
        .min(1, 'Password is required')
        .min(6, 'Password must be more than 5 characters')
        .max(32, 'Password must be less than 32 characters')
});

export const CreateFormSchema = z.object({
    title: z
        .string({
            required_error: 'Title is required'
        })
        .min(3, 'More than 2 characters required'),
    content: z
        .string({
            required_error: 'Content is required'
        })
        .min(3, 'More than 2 characters required')
});

export type CreateFormInput = z.infer<typeof CreateFormSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
