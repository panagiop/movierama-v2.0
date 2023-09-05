'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import useCreatePostMutation from '@/client/api-calls/useCreatePostMutation';
import { ZodIssue, z } from 'zod';
import { CreateFormSchema } from '@/validations';

export default function CreatePostForm() {
    const { mutate: createPost, isLoading, error } = useCreatePostMutation();
    const [formValues, setFormValues] = useState({
        title: '',
        content: ''
    });

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
            CreateFormSchema.parse(data);
            createPost(formValues);
            setErrors([]);
        } catch (e) {
            if (e instanceof z.ZodError) {
                setErrors(e.errors);
            }
        }
    };

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const inputStyle =
        'w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

    return (
        <form onSubmit={onSubmit}>
            {error && (
                <p className="text-center bg-red-300 py-4 mb-6 rounded">
                    {error}
                </p>
            )}
            <div className="mb-6">
                <input
                    required
                    type="text"
                    name="title"
                    value={formValues.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className={inputStyle}
                />
                {displayValidationError('title')}
            </div>
            <div className="mb-6">
                <textarea
                    id="message"
                    name="content"
                    value={formValues.content}
                    onChange={handleChange}
                    rows={4}
                    className={inputStyle}
                    placeholder="Description..."
                />
                {displayValidationError('content')}
            </div>
            <button
                type="submit"
                style={{ backgroundColor: `${isLoading ? '#ccc' : '#3446eb'}` }}
                className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                disabled={isLoading}
            >
                {isLoading ? 'loading...' : 'Save'}
            </button>
        </form>
    );
}
