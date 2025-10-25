import styled from 'styled-components';
import { type Options } from './Filter';
import { type ChangeEvent } from 'react';

type StyledSelectProps = {
    type?: 'white';
};

type SelectProps = {
    type?: 'white';
    options: Options;
    selectValue: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const StyledSelect = styled.select<StyledSelectProps>`
    font-weight: 500;
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    box-shadow: var(--shadow-sm);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);

    border: 1px solid
        ${({ type }) => {
            return type === 'white'
                ? 'var(--color-grey-100)'
                : 'var(--color-grey-300)';
        }};
`;

export default function Select({
    type,
    options,
    onChange,
    selectValue,
}: SelectProps) {
    return (
        <StyledSelect
            type={type}
            value={selectValue}
            onChange={(e) => onChange(e)}
        >
            {options.map((option) => {
                const { id, value, label } = option;

                return (
                    <option key={id} value={value}>
                        {label}
                    </option>
                );
            })}
        </StyledSelect>
    );
}
