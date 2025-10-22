import { useSearchParams } from 'react-router-dom';
import { type Cabins } from '@/lib/supabase/services/cabin.service';

type UseFilterProps<T> = {
    datas?: T[];
    searchParameter: string;
};

export default function useCabinFilter<T extends Cabins>({
    datas,
    searchParameter,
}: UseFilterProps<T>) {
    const [searchParams] = useSearchParams();
    const filter = searchParams.get(searchParameter) || 'all';

    const filteredData = datas?.filter((data) => {
        switch (filter) {
            case 'no-discount': {
                return !data.discount;
            }
            case 'with-discount': {
                return data.discount;
            }
            default:
                return data;
        }
    });

    return filteredData;
}
