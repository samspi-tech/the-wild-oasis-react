import CabinRow from './CabinRow';
import Spinner from '@/ui/Spinner';
import styled from 'styled-components';
import { useCabinQuery } from '@/reactQuery/queries/useCabinQuery';

const Table = styled.div`
    overflow: hidden;
    font-size: 1.4rem;
    border-radius: 7px;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
`;

const TableHeader = styled.header`
    display: grid;
    column-gap: 2.4rem;
    align-items: center;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;

    font-weight: 600;
    letter-spacing: 0.4px;
    padding: 1.6rem 2.4rem;
    text-transform: uppercase;
    color: var(--color-grey-600);
    background-color: var(--color-grey-50);
    border-bottom: 1px solid var(--color-grey-100);
`;

export default function CabinTable() {
    const { isLoading, cabins } = useCabinQuery();

    if (isLoading) return <Spinner />;

    return (
        <Table role="table">
            <TableHeader role="row">
                <div></div>
                <div>Cabin</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </TableHeader>
            {cabins?.map((cabin) => (
                <CabinRow key={cabin.id} cabin={cabin} />
            ))}
        </Table>
    );
}
