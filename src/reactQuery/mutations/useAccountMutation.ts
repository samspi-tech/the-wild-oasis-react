import toast from 'react-hot-toast';
import {
    updateUser,
    updatePassword,
    type UpdateUserPayload,
    type UpdatePasswordPayload,
} from '@/lib/supabase/services/user.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useAccountMutation() {
    const queryClient = useQueryClient();

    const { mutate: handleUpdateUser, isPending: isUpdatingUser } = useMutation(
        {
            mutationFn: (payload: UpdateUserPayload) => updateUser(payload),
            onSuccess: () => {
                toast.success('Account successfully updated');

                queryClient.invalidateQueries({
                    queryKey: ['user'],
                });
            },
            onError: (error) => {
                if (error instanceof Error) toast.error(error.message);
            },
        }
    );

    const { mutate: handleUpdatePassword, isPending: isUpdatingPassword } =
        useMutation({
            mutationFn: (payload: UpdatePasswordPayload) => {
                return updatePassword(payload);
            },
            onSuccess: () => {
                toast.success('Password successfully updated');
            },
            onError: (error) => {
                if (error instanceof Error) toast.error(error.message);
            },
        });

    return {
        handleUpdateUser,
        handleUpdatePassword,
        isUpdatingUser,
        isUpdatingPassword,
    };
}
