import Filter from '@/ui/Filter';
import TableOperations from '@/ui/TableOperations';

export default function CabinTableOperations() {
    const options = [
        {
            value: 'all',
            label: 'All',
        },
        {
            value: 'no-discount',
            label: 'No discount',
        },
        {
            value: 'with-discount',
            label: 'With discount',
        },
    ];

    return (
        <TableOperations>
            <Filter searchParameter="discount" options={options} />
        </TableOperations>
    );
}
