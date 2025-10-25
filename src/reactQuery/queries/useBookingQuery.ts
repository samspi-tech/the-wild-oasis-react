import { useQuery } from '@tanstack/react-query';
import { getAllBookings } from '@/lib/supabase/services/bookings.service';
import { getBookingFilter } from '@/utils/getBookingFilter';
import { useSearchParams } from 'react-router-dom';
import { getBookingSort } from '@/utils/getBookingSort';

export default function useBookingQuery() {
    const [searchParams] = useSearchParams();

    const filter = getBookingFilter(searchParams);
    const sortBy = getBookingSort(searchParams);

    const { isLoading, data: bookings } = useQuery({
        queryKey: ['bookings', filter, sortBy],
        queryFn: () => getAllBookings({ filter, sortBy }),
    });

    return { isLoading, bookings };
}
