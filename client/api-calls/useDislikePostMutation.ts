import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDislikePostMutation() {
    const queryClient = useQueryClient();

    async function dislikePost(postId: number) {
        try {
            const response = await fetch(`/api/posts/${postId}/dislike`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });
            const result = await response.json();
            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }

    const { mutate, isLoading } = useMutation({
        mutationFn: (postId: number) => dislikePost(postId),
        onSuccess: () => queryClient.invalidateQueries(['posts'])
    });

    return { mutate, isLoading };
}
