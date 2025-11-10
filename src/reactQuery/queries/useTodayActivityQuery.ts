import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '@/lib/supabase/services/bookings.service';

export default function useTodayActivityQuery() {
    const { isLoading, data: activities } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ['today-activity'],
    });

    return { isLoading, activities };
}
