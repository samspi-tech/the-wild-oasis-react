import {
    deleteBooking,
    updateBooking,
} from '@/lib/supabase/services/bookings.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type UpdateBookingArgs } from '@/lib/supabase/services/types/types';

export default function useBookingMutation() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: handleUpdateBooking, isPending: isUpdating } = useMutation({
        mutationFn: ({ id, payload }: UpdateBookingArgs) => {
            return updateBooking({ id, payload });
        },
        onSuccess: (data) => {
            const { id, status } = data;

            const isCheckIn = status === 'checked-in';
            const checkStatus = isCheckIn ? 'checked in' : ' checked out';

            toast.success(`Booking #${id} successfully ${checkStatus}!`);

            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            queryClient.invalidateQueries({ queryKey: ['singleBooking'] });

            isCheckIn && navigate('/');
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    const { mutate: handleDeleteBooking, isPending: isDeleting } = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            toast.success(`Booking successfully deleted`);

            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            queryClient.invalidateQueries({ queryKey: ['singleBooking'] });
        },
        onError: (error) => {
            if (error instanceof Error) toast.error(error.message);
        },
    });

    return {
        isUpdating,
        isDeleting,
        handleUpdateBooking,
        handleDeleteBooking,
    };
}
