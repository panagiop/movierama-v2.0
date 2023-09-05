import { useQuery } from '@tanstack/react-query';

export default function usePosts({
    sortBy,
    sortOrder,
    isUsedInPostsByUser,
    userId
}: {
    sortBy: string;
    sortOrder: string;
    isUsedInPostsByUser: boolean;
    userId: string;
}) {
    const apiCall = async () => {
        return isUsedInPostsByUser
            ? fetch(
                  `/api/users/${userId}/posts?sortBy=${sortBy}&sortOrder=${sortOrder}`
              ).then((res) => res.json())
            : fetch(`/api/posts?sortBy=${sortBy}&sortOrder=${sortOrder}`).then(
                  (res) => res.json()
              );
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['posts', sortBy, sortOrder],
        queryFn: apiCall
    });
    return { data, isLoading, error };
}
