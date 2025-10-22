import { useSearchParams } from 'react-router-dom';
import { type UseFilterArgs as UseSortArgs } from './useFilter';

export default function useSort<T>({ datas, param }: UseSortArgs<T>) {
    const [searchParams] = useSearchParams();

    const sort = searchParams.get(param) || 'startDate-asc';
    const [field, direction] = sort?.split('-');

    const key = field as keyof T;
    const modifier = direction === 'asc' ? 1 : -1;

    const sortedDatas = datas?.sort((a, b) => {
        const firstElement = a[key] as number;
        const secondElement = b[key] as number;

        return (firstElement - secondElement) * modifier;
    });

    return sortedDatas;
}
