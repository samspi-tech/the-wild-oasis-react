import { type ReactNode } from 'react';
import styled from 'styled-components';

type CheckboxProps = {
    id: string;
    isChecked: boolean;
    isDisabled: boolean;
    children: ReactNode;
    onChange: () => void;
};

const StyledCheckbox = styled.div`
    gap: 1.6rem;
    display: flex;

    & input[type='checkbox'] {
        width: 2.4rem;
        height: 2.4rem;
        outline-offset: 2px;
        transform-origin: 0;
        accent-color: var(--color-brand-600);
    }

    & input[type='checkbox']:disabled {
        accent-color: var(--color-brand-600);
    }

    & label {
        flex: 1;
        gap: 0.8rem;
        display: flex;
        align-items: center;
    }
`;

export default function Checkbox({
    id,
    onChange,
    children,
    isChecked,
    isDisabled = false,
}: CheckboxProps) {
    const htmlFor = !isDisabled ? id : '';

    return (
        <StyledCheckbox>
            <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                disabled={isDisabled}
            />
            <label htmlFor={htmlFor}>{children}</label>
        </StyledCheckbox>
    );
}
