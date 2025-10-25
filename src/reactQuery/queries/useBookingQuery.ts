import { getPages } from '@/utils/getPages';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookingSort } from '@/utils/getBookingSort';
import { getBookingFilter } from '@/utils/getBookingFilter';
import { getAllBookings } from '@/lib/supabase/services/bookings.service';

export default function useBookingQuery() {
    const [searchParams] = useSearchParams();

    const pages = getPages(searchParams);
    const sortBy = getBookingSort(searchParams);
    const filter = getBookingFilter(searchParams);

    const { isLoading, data } = useQuery({
        queryKey: ['bookings', filter, sortBy, pages],
        queryFn: () => getAllBookings({ filter, sortBy, pages }),
    });

    const { data: bookings, count: bookingsCount } = data ?? {};

    return {
        isLoading,
        bookings,
        bookingsCount,
    };
}
