import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type FormValues = {
    title: string;
    content: string;
};

export default function useCreatePostMutation() {
    const router = useRouter();

    async function createPost(formValues: FormValues) {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify(formValues),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    const {
        mutate,
        isLoading,
        error
    }: { mutate: any; isLoading: boolean; error: any } = useMutation({
        mutationFn: (formValues: FormValues) => createPost(formValues),
        onSuccess: () => router.push('/posts')
    });

    return { mutate, isLoading, error };
}
