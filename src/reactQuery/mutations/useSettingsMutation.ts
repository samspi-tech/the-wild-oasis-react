import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting } from '@/lib/supabase/services/settings.service';

export function useSettingsMutation() {
    const queryClient = useQueryClient();

    const { mutate: handleUpdateSetting, isPending } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            toast.success('Setting successfully updated');

            queryClient.invalidateQueries({
                queryKey: ['settings'],
            });
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    return { isPending, handleUpdateSetting };
}
