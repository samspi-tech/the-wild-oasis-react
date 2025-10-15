import {
    createCabin,
    updateCabin,
} from '@/lib/supabase/services/cabin.service';
import { type CabinSchema } from '@/zod/cabinSchema';

import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UseCabinMutationArgs = {
    cabinId?: number;
    reset: () => void;
    onHide: () => void;
    isEditCabin: boolean;
};

export function useCabinMutation({
    reset,
    onHide,
    cabinId,
    isEditCabin,
}: UseCabinMutationArgs) {
    const queryClient = useQueryClient();

    const { mutate: handleCreateCabin, isPending: isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success('New cabin successfully created');

            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });

            reset();
            onHide();
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    type EditCabinArgs = {
        id?: number;
        payload: CabinSchema;
    };

    const { mutate: handleEditCabin, isPending: isUpdating } = useMutation({
        mutationFn: ({ payload, id }: EditCabinArgs) => {
            return updateCabin(payload, id);
        },
        onSuccess: () => {
            toast.success('Cabin successfully updated');

            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });

            reset();
            onHide();
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    const isPending = isEditCabin ? isUpdating : isCreating;

    const onSubmit = (data: CabinSchema) => {
        isEditCabin
            ? handleEditCabin({ payload: data, id: cabinId })
            : handleCreateCabin(data);
    };

    return { isPending, onSubmit };
}
