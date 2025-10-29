import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { type AuthPayload, login } from '@/lib/supabase/services/auth.service';

export default function useAuthMutation() {
    const navigate = useNavigate();

    const { mutate: handleLogin, isPending: isLogingIn } = useMutation({
        mutationFn: (payload: AuthPayload) => login(payload),
        onSuccess: () => {
            toast.success('Logged in successfully');
            navigate('/', { replace: true });
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    return { isLogingIn, handleLogin };
}
