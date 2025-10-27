import {
    updateBooking,
    type UpdateBookingArgs,
} from '@/lib/supabase/services/bookings.service';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useBookingMutation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: handleUpdateBooking, isPending } = useMutation({
        mutationFn: ({ id, payload }: UpdateBookingArgs) => {
            return updateBooking({ id, payload });
        },
        onSuccess: ({ id }) => {
            toast.success(`Booking #${id} successfully checked in!`);

            queryClient.invalidateQueries({
                queryKey: ['bookings'],
            });

            navigate('/');
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    return { isPending, handleUpdateBooking };
}
