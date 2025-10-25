import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookingSort } from '@/utils/getBookingSort';
import { getBookingFilter } from '@/utils/getBookingFilter';
import { getAllBookings } from '@/lib/supabase/services/bookings.service';

export default function useBookingQuery() {
    const [searchParams] = useSearchParams();

    const sortBy = getBookingSort(searchParams);
    const filter = getBookingFilter(searchParams);

    const { isLoading, data: bookings } = useQuery({
        queryKey: ['bookings', filter, sortBy],
        queryFn: () => getAllBookings({ filter, sortBy }),
    });

    return { isLoading, bookings };
}
