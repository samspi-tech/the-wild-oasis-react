import Empty from '@/ui/Empty';
import Menus from '@/ui/Menus';
import Table from '@/ui/Table';
import CabinRow from './CabinRow';
import Spinner from '@/ui/Spinner';

import useSort from '@/hooks/useSort';
import useFilter from '@/hooks/useFilter';
import { useCabinQuery } from '@/reactQuery/queries/useCabinQuery';

export default function CabinTable() {
    const { isLoading, cabins } = useCabinQuery();

    const filteredCabins = useFilter({
        datas: cabins,
        param: 'discount',
    });

    const sortedCabins = useSort({
        param: 'sortBy',
        datas: filteredCabins,
    });

    if (isLoading) return <Spinner />;
    if (!sortedCabins?.length) return <Empty resourceName="cabin" />;

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
                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow key={cabin.id} cabin={cabin} />
                    )}
                />
            </Table>
        </Menus>
    );
}
