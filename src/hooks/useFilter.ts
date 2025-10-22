import { useSearchParams } from 'react-router-dom';
import { type Cabins } from '@/lib/supabase/services/cabin.service';

export type UseFilterArgs<T> = {
    datas?: T[];
    param: string;
};

export default function useFilter<T extends Cabins>({
    datas,
    param,
}: UseFilterArgs<T>) {
    const [searchParams] = useSearchParams();
    const filter = searchParams.get(param) || 'all';

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
