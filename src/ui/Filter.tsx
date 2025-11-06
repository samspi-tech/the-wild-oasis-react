import styled, { css } from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { handlePageReset } from '@/utils/paginationHelpers';

export type Options = {
    id: string;
    value: string;
    label: string;
}[];

type FilterButtonProps = {
    active: boolean;
};

type FilterProps = {
    options: Options;
    searchParameter: string;
};

const StyledFilter = styled.div`
    gap: 0.4rem;
    display: flex;

    padding: 0.4rem;
    box-shadow: var(--shadow-sm);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-grey-100);
`;

const ButtonActive = css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
`;

const FilterButton = styled.button<FilterButtonProps>`
    border: none;
    font-weight: 500;
    font-size: 1.4rem;
    transition: all 0.3s;
    padding: 0.44rem 0.8rem;
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);

    ${({ active }) => active && ButtonActive}

    &:hover:not(:disabled) {
        color: var(--color-brand-50);
        background-color: var(--color-brand-600);
    }
`;

export default function Filter({ searchParameter, options }: FilterProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilter = (value: string) => {
        searchParams.set(searchParameter, value);
        setSearchParams(searchParams);

        handlePageReset(searchParams, setSearchParams);
    };

    return (
        <StyledFilter>
            {options.map((option) => {
                const { id, value, label } = option;
                const filter = searchParams.get(searchParameter);

                const hasNoFilter = !filter && label === options[0].label;
                const isActiveButton = hasNoFilter || filter === value;

                return (
                    <FilterButton
                        key={id}
                        active={isActiveButton}
                        disabled={isActiveButton}
                        onClick={() => handleFilter(value)}
                    >
                        {label}
                    </FilterButton>
                );
            })}
        </StyledFilter>
    );
}
