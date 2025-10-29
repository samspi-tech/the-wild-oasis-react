import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type AuthPayload, login } from '@/lib/supabase/services/auth.service';

export default function useAuthMutation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: handleLogin, isPending: isLogingIn } = useMutation({
        mutationFn: (payload: AuthPayload) => login(payload),
        onSuccess: (data) => {
            toast.success('Logged in successfully');

            queryClient.setQueryData(['user'], data.user);

            navigate('/', { replace: true });
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    return { isLogingIn, handleLogin };
}
