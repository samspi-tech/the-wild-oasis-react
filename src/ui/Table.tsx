import styled from 'styled-components';
import { createContext, useContext, type ReactNode } from 'react';

type ColumnsType = {
    columns: string;
};

type TableProps = {
    columns: string;
    children: ReactNode;
};

type ChildrenProp = {
    children: ReactNode;
};

type BodyProps<T> = {
    data?: T[];
    render: (data: T) => ReactNode;
};

const StyledTable = styled.div`
    overflow: hidden;
    font-size: 1.4rem;
    border-radius: 7px;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
`;

const CommonRow = styled.div<ColumnsType>`
    display: grid;
    column-gap: 2.4rem;
    align-items: center;

    transition: none;

    grid-template-columns: ${({ columns }) => columns};
`;

const StyledHeader = styled(CommonRow)`
    font-weight: 600;
    letter-spacing: 0.4px;
    padding: 1.6rem 2.4rem;
    text-transform: uppercase;
    color: var(--color-grey-600);
    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
`;

const StyledRow = styled(CommonRow)`
    padding: 1.2rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const StyledBody = styled.section`
    margin: 0.4rem 0;
`;

const Footer = styled.footer`
    display: flex;
    justify-content: center;

    padding: 1.2rem;
    background-color: var(--color-grey-50);

    &:not(:has(*)) {
        display: none;
    }
`;

const Empty = styled.p`
    margin: 2.4rem;
    font-weight: 500;
    font-size: 1.6rem;
    text-align: center;
`;

const TableContext = createContext<ColumnsType | null>(null);

export default function Table({ children, columns }: TableProps) {
    return (
        <TableContext.Provider value={{ columns }}>
            <StyledTable role="table">{children}</StyledTable>
        </TableContext.Provider>
    );
}

function Header({ children }: ChildrenProp) {
    const { columns } = useContext(TableContext)!;

    return (
        <StyledHeader role="row" columns={columns} as="header">
            {children}
        </StyledHeader>
    );
}

function Row({ children }: ChildrenProp) {
    const { columns } = useContext(TableContext)!;

    return (
        <StyledRow role="row" columns={columns}>
            {children}
        </StyledRow>
    );
}

function Body<T>({ data, render }: BodyProps<T>) {
    if (!data) return <Empty>No data to show at the moment</Empty>;

    return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Row = Row;
Table.Body = Body;
Table.Header = Header;
Table.Footer = Footer;
