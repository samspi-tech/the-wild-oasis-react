import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSingleBooking } from '@/lib/supabase/services/bookings.service';

export default function useSingleBookingQuery() {
    const { bookingId } = useParams();
    const id = Number(bookingId);

    const { isLoading, data: singleBooking } = useQuery({
        queryKey: ['singleBooking', bookingId],
        queryFn: () => getSingleBooking(id),
        retry: false,
    });

    return { isLoading, singleBooking };
}
