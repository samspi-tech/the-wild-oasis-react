import { type ReactNode } from 'react';
import styled from 'styled-components';

type DataItemProps = {
    label: string;
    icon: ReactNode;
    children: ReactNode;
};

const StyledDataItem = styled.div`
    gap: 1.6rem;
    display: flex;
    align-items: center;

    padding: 0.8rem 0;
`;

const Label = styled.span`
    gap: 0.8rem;
    display: flex;
    align-items: center;

    font-weight: 500;

    & svg {
        width: 2rem;
        height: 2rem;
        color: var(--color-brand-600);
    }
`;

export default function DataItem({ icon, label, children }: DataItemProps) {
    return (
        <StyledDataItem>
            <Label>
                {icon}
                <span>{label}</span>
            </Label>
            {children}
        </StyledDataItem>
    );
}
