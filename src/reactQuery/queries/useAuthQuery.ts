import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/lib/supabase/services/auth.service';

export default function useAuthQuery() {
    const { isLoading, data: user } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
    });

    const isAuthenticated = user?.role === 'authenticated';

    return { isLoading, user, isAuthenticated };
}
