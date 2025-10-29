import {
    login,
    logout,
    type AuthPayload,
} from '@/lib/supabase/services/auth.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useAuthMutation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: handleLogin, isPending: isLogingIn } = useMutation({
        mutationFn: (payload: AuthPayload) => login(payload),
        onSuccess: (data) => {
            toast.success('Welcome back!');

            queryClient.setQueryData(['user'], data.user);

            navigate('/', { replace: true });
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    const { mutate: handleLogout, isPending: isLogingOut } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            toast.success('See you next time!');

            queryClient.removeQueries();

            navigate('/login', { replace: true });
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    return {
        isLogingIn,
        isLogingOut,
        handleLogin,
        handleLogout,
    };
}
