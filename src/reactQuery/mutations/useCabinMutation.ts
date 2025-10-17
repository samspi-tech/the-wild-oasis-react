import {
    deleteCabin,
    createCabin,
    updateCabin,
} from '@/lib/supabase/services/cabin.service';
import { type CabinSchema } from '@/zod/cabinSchema';

import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UpdateCabinArgs = {
    id?: number;
    payload: CabinSchema;
};

type UseCabinMutationArgs = {
    cabinId?: number;
    reset?: () => void;
    onClose?: () => void;
    isUpdateCabin?: boolean;
};

export function useCabinMutation({
    reset,
    onClose,
    cabinId,
    isUpdateCabin,
}: UseCabinMutationArgs) {
    const queryClient = useQueryClient();

    const { mutate: handleDeleteCabin, isPending: isDeleting } = useMutation({
        mutationFn: deleteCabin,
        onSuccess: () => {
            toast.success('Cabin successfully deleted');

            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    const { mutate: handleCreateCabin, isPending: isCreating } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success('New cabin successfully created');

            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });

            reset?.();
            onClose?.();
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    const { mutate: handleUpdateCabin, isPending: isUpdating } = useMutation({
        mutationFn: ({ payload, id }: UpdateCabinArgs) => {
            return updateCabin(payload, id);
        },
        onSuccess: () => {
            toast.success('Cabin successfully updated');

            queryClient.invalidateQueries({
                queryKey: ['cabins'],
            });

            reset?.();
            onClose?.();
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    const isPending = isUpdateCabin ? isUpdating : isCreating;

    const onSubmit = (data: CabinSchema) => {
        isUpdateCabin
            ? handleUpdateCabin({ payload: data, id: cabinId })
            : handleCreateCabin(data);
    };

    return {
        isPending,
        isDeleting,
        isCreating,
        onSubmit,
        handleDeleteCabin,
        handleCreateCabin,
    };
}
