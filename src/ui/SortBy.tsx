import Select from './Select';
import { type ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type Options } from '@/features/cabins/cabinTableOperations/dataSource';

type SortByProps = {
    options: Options;
};

export default function SortBy({ options }: SortByProps) {
    const [searchParam, setSearchParam] = useSearchParams();

    const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
        const target = e.target.value;

        searchParam.set('sortBy', target);
        setSearchParam(searchParam);
    };

    const sortBy = searchParam.get('sortBy') || '';

    return (
        <Select
            type="white"
            options={options}
            selectValue={sortBy}
            onChange={handleSort}
        />
    );
}
