export function getBookingFilter(searchParams: URLSearchParams) {
    const filterValue = searchParams.get('status');

    const filter = {
        name: 'status',
        value: filterValue,
    };

    const hasNoFilter = !filterValue || filterValue === 'all';

    return hasNoFilter ? null : filter;
}
