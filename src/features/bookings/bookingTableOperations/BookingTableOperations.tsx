import SortBy from '@/ui/SortBy';
import Filter from '@/ui/Filter';
import TableOperations from '@/ui/TableOperations';
import { bookingFilters, bookingSorts } from './dataSource';

function BookingTableOperations() {
    return (
        <TableOperations>
            <Filter searchParameter="status" options={bookingFilters} />
            <SortBy options={bookingSorts} />
        </TableOperations>
    );
}

export default BookingTableOperations;
