import Select from './Select';
import { type Options } from './Filter';
import { type ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

type SortByProps = {
    options: Options;
};

export default function SortBy({ options }: SortByProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
        const target = e.target.value;

        searchParams.set('sortBy', target);
        setSearchParams(searchParams);
    };

    const sortBy = searchParams.get('sortBy') || '';

    return (
        <Select
            type="white"
            options={options}
            selectValue={sortBy}
            onChange={handleSort}
        />
    );
}
