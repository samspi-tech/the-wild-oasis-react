import { type ReactNode } from 'react';
import styled from 'styled-components';

type SingleStatProps = {
    title: string;
    color: string;
    icon: ReactNode;
    value?: number | string;
};

const StyledStat = styled.div`
    padding: 1.6rem;
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-grey-100);

    display: grid;
    row-gap: 0.4rem;
    column-gap: 1.6rem;
    grid-template-rows: auto auto;
    grid-template-columns: 6.4rem 1fr;
`;

const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    aspect-ratio: 1;
    grid-row: 1 / -1;
    border-radius: 50%;
    background-color: var(--color-${(props) => props.color}-100);

    & svg {
        width: 3.2rem;
        height: 3.2rem;
        color: var(--color-${(props) => props.color}-700);
    }
`;

const Title = styled.h5`
    align-self: end;
    font-weight: 600;
    font-size: 1.2rem;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: var(--color-grey-500);
`;

const Value = styled.p`
    line-height: 1;
    font-weight: 500;
    font-size: 2.4rem;
`;

export default function SingleStat({
    icon,
    value,
    color,
    title,
}: SingleStatProps) {
    return (
        <StyledStat>
            <Icon color={color}>{icon}</Icon>
            <Title>{title}</Title>
            <Value>{value}</Value>
        </StyledStat>
    );
}
