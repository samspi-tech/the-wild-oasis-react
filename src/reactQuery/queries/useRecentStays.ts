import { subDays } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '@/lib/supabase/services/bookings.service';

export default function useRecentStays() {
    const [searchParams] = useSearchParams();

    const numDays = Number(searchParams.get('last')) || 7;
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading: isLoadingStays, data: recentStays } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ['recent-stays', `last-${numDays}`],
    });

    const confirmedStays = recentStays?.filter((stay) => {
        const { status } = stay;

        return status === 'checked-in' || status === 'checked-out';
    });

    return {
        numDays,
        recentStays,
        isLoadingStays,
        confirmedStays,
    };
}
