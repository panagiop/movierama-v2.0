'use client';

import React, { FormEvent, useState } from 'react';
import useRegisterUserMutation from '@/client/api-calls/useRegisterUserMutation';
import { ZodIssue, z } from 'zod';
import { RegisterUserSchema } from '@/validations';

export default function RegisterForm() {
    const {
        mutate: registerUser,
        isLoading,
        error: errorFromServer
    } = useRegisterUserMutation();

    const [errors, setErrors] = useState<ZodIssue[]>([]);

    const displayValidationError = (path: string) => {
        const foundError = errors.find((err) => err.path[0] === path);

        return foundError ? (
            <small className="text-red-500">{foundError?.message}</small>
        ) : null;
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        try {
            RegisterUserSchema.parse(data);
            registerUser(data);
            setErrors([]);
        } catch (e) {
            if (e instanceof z.ZodError) {
                setErrors(e.errors);
            }
        }
    };

    const inputStyle =
        'w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

    return (
        <form onSubmit={onSubmit}>
            {errorFromServer?.message && (
                <p className="text-white text-center bg-red-400 py-4 mb-6 rounded">
                    {errorFromServer?.message}
                </p>
            )}
            <div className="mb-6">
                <input
                    required
                    type="name"
                    name="name"
                    placeholder="Name"
                    className={`${inputStyle}`}
                />
                {displayValidationError('name')}
            </div>
            <div className="mb-6">
                <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className={`${inputStyle}`}
                />
                {displayValidationError('email')}
            </div>
            <div className="mb-6">
                <input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={`${inputStyle}`}
                />
                {displayValidationError('password')}
            </div>
            <button
                type="submit"
                style={{
                    backgroundColor: `${isLoading ? '#ccc' : '#3446eb'}`
                }}
                className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                disabled={isLoading}
            >
                {isLoading ? 'loading...' : 'Sign Up'}
            </button>
        </form>
    );
}
