import Menus from '@/ui/Menus';
import Table from '@/ui/Table';
import CabinRow from './CabinRow';
import Spinner from '@/ui/Spinner';

import useSort from '@/hooks/useSort';
import useFilter from '@/hooks/useFilter';
import { useCabinQuery } from '@/reactQuery/queries/useCabinQuery';
import { type Cabins } from '@/lib/supabase/services/cabin.service';

export default function CabinTable() {
    const { isLoading, cabins } = useCabinQuery();

    const filteredCabins = useFilter<Cabins>({
        datas: cabins,
        param: 'discount',
    });

    const sortedCabins = useSort<Cabins>({
        param: 'sortBy',
        datas: filteredCabins,
    });

    if (isLoading) return <Spinner />;

    return (
        <Menus>
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
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                />
            </Table>
        </Menus>
    );
}
