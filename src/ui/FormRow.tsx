import { type ReactElement } from 'react';
import styled, { css } from 'styled-components';

type StyledFormRowProps = {
    type?: 'vertical' | 'horizontal';
};

const vertical = css`
    gap: 0.8rem;
    display: flex;
    flex-direction: column;
`;

const horizontal = css`
    gap: 2.4rem;
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;

    &:first-child {
        padding-top: 0;
    }

    &:last-child {
        padding-bottom: 0;
    }

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }

    &:has(button) {
        gap: 1.2rem;
        display: flex;
        justify-content: flex-end;
    }
`;

const StyledFormRow = styled.div<StyledFormRowProps>`
    padding: 1.2rem 0;

    ${({ type }) => (type === 'horizontal' ? horizontal : vertical)}
`;

const Label = styled.label`
    font-weight: 500;
`;

const ErrorMessage = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

type InputId = { id: string };

type FormRowProps = {
    error?: string;
    label?: string;
    children: ReactElement<InputId>;
    type?: 'vertical' | 'horizontal';
};

export default function FormRow({
    error,
    label,
    children,
    type = 'horizontal',
}: FormRowProps) {
    return (
        <StyledFormRow type={type}>
            {label && <Label htmlFor={children.props.id}>{label}</Label>}
            {children}
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </StyledFormRow>
    );
}
