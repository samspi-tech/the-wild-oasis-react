import { PAGE_SIZE } from '@/utils/amounts';
import { useSearchParams } from 'react-router-dom';
import { getCurrentPage } from '@/utils/paginationHelpers';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllBookings } from '@/lib/supabase/services/bookings.service';
import { getBookingFilter, getBookingSort } from '@/utils/bookingHelpers';

export default function useBookingsQuery() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const sortBy = getBookingSort(searchParams);
    const filter = getBookingFilter(searchParams);
    const currentPage = getCurrentPage(searchParams);

    const bookingQueryKey = ['bookings', filter, sortBy];
    const bookingQueryArgs = { filter, sortBy, currentPage };

    const { isLoading, data } = useQuery({
        queryKey: [...bookingQueryKey, currentPage],
        queryFn: () => getAllBookings({ ...bookingQueryArgs }),
    });

    const { data: bookings, count: bookingsCount } = data ?? {};

    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;
    const pageCount = bookingsCount && Math.ceil(bookingsCount / PAGE_SIZE);

    if (pageCount && currentPage < pageCount) {
        queryClient.prefetchQuery({
            queryKey: [...bookingQueryKey, nextPage],
            queryFn: () => {
                return getAllBookings({
                    ...bookingQueryArgs,
                    currentPage: nextPage,
                });
            },
        });
    }

    if (currentPage > 1) {
        queryClient.prefetchQuery({
            queryKey: [...bookingQueryKey, prevPage],
            queryFn: () => {
                return getAllBookings({
                    ...bookingQueryArgs,
                    currentPage: prevPage,
                });
            },
        });
    }

    return {
        isLoading,
        bookings,
        bookingsCount,
    };
}
