import { subDays } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '@/lib/supabase/services/bookings.service';

export default function useRecentBookings() {
    const [searchParams] = useSearchParams();

    const numDays = Number(searchParams.get('last')) || 7;
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading: isLoadingBookings, data: recentBookings } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ['recent-bookings', `last-${numDays}`],
    });

    return { isLoadingBookings, recentBookings };
}
