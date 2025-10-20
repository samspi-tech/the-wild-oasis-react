import Table from '@/ui/Table';
import CabinRow from './CabinRow';
import Spinner from '@/ui/Spinner';
import { useCabinQuery } from '@/reactQuery/queries/useCabinQuery';
import { type Cabins } from '@/lib/supabase/services/cabin.service';

export default function CabinTable() {
    const { isLoading, cabins } = useCabinQuery();

    if (isLoading) return <Spinner />;

    return (
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
            <Table.Header>
                <div></div>
                <div>Cabin</div>
                <div>Capacity</div>
                <div>Price</div>
                <div>Discount</div>
                <div></div>
            </Table.Header>
            <Table.Body<Cabins>
                data={cabins}
                render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
            />
        </Table>
    );
}
