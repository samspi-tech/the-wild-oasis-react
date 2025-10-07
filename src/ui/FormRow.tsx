import styled from 'styled-components';

const StyledFormRow = styled.div`
    gap: 2.4rem;
    display: grid;
    align-items: center;
    grid-template-columns: 24rem 1fr 1.2fr;

    padding: 1.2rem 0;

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

const Label = styled.label`
    font-weight: 500;
`;

const ErrorMessage = styled.span`
    font-size: 1.4rem;
    color: var(--color-red-700);
`;

type LabelId = { id: string };

type FormRowProps = {
    error?: string;
    label?: string;
    children: React.ReactElement<LabelId>;
};

export default function FormRow({ error, label, children }: FormRowProps) {
    return (
        <StyledFormRow>
            {label && <Label htmlFor={children.props.id}>{label}</Label>}
            {children}
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </StyledFormRow>
    );
}
