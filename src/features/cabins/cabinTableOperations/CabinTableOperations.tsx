import Filter from '@/ui/Filter';
import SortBy from '@/ui/SortBy';
import TableOperations from '@/ui/TableOperations';
import { cabinFilters, cabinSorts } from './dataSource';

export default function CabinTableOperations() {
    return (
        <TableOperations>
            <Filter searchParameter="discount" options={cabinFilters} />
            <SortBy options={cabinSorts} />
        </TableOperations>
    );
}
