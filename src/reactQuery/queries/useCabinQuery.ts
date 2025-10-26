import { useQuery } from '@tanstack/react-query';
import { getAllCabins } from '@/lib/supabase/services/cabin.service';

export default function useCabinQuery() {
    const { isLoading, data: cabins } = useQuery({
        queryKey: ['cabins'],
        queryFn: getAllCabins,
    });

    return { isLoading, cabins };
}
