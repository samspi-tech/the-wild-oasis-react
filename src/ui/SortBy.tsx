import Select from './Select';
import { type Options } from './Filter';
import { type ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

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
