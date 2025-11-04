import {
    login,
    logout,
    signup,
    type LoginPayload,
} from '@/lib/supabase/services/auth.service';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useAuthMutation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: handleLogin, isPending: isLogingIn } = useMutation({
        mutationFn: (payload: LoginPayload) => login(payload),
        onSuccess: ({ user }) => {
            const userName: string = user.user_metadata.fullName ?? 'Admin';
            toast.success(`Welcome back ${userName}!`);

            queryClient.setQueryData(['user'], user);

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

    const { mutate: handleSignup, isPending: isSigningUp } = useMutation({
        mutationFn: signup,
        onSuccess: () => {
            toast.success(
                "Account successfully created! Please confirm the new user's email address."
            );
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    return {
        isLogingIn,
        isLogingOut,
        isSigningUp,
        handleLogin,
        handleLogout,
        handleSignup,
    };
}
