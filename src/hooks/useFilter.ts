import { useSearchParams } from 'react-router-dom';
import { type Cabins } from '@/lib/supabase/services/cabin.service';
import { type Bookings } from '@/lib/supabase/services/bookings.service';

export type UseFilterArgs<T> = {
    datas?: T[];
    param: string;
};

type Datas = Cabins | Bookings;

export default function useFilter<T extends Datas>({
    datas,
    param,
}: UseFilterArgs<T>) {
    const [searchParams] = useSearchParams();
    const filter = searchParams.get(param) || 'all';

    const filteredData = datas?.filter((data) => {
        const cabin = data as Cabins;

        switch (filter) {
            case 'no-discount': {
                return !cabin.discount;
            }
            case 'with-discount': {
                return cabin.discount;
            }
            default:
                return data;
        }
    });

    return filteredData;
}
