import { useQuery } from '@tanstack/react-query';
import { getAllBookings } from '@/lib/supabase/services/bookings.service';

export default function useBookingQuery() {
    const { isLoading, data: bookings } = useQuery({
        queryKey: ['bookings'],
        queryFn: getAllBookings,
    });

    return { isLoading, bookings };
}
