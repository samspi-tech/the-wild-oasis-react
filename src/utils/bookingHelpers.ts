export function getBookingFilter(searchParams: URLSearchParams) {
    const filterValue = searchParams.get('status');

    const filter = {
        name: 'status',
        value: filterValue,
    };

    const hasNoFilter = !filterValue || filterValue === 'all';

    return hasNoFilter ? null : filter;
}

export function getBookingSort(searchParams: URLSearchParams) {
    const sortValue = searchParams.get('sortBy') || 'startDate-asc';

    const [field, direction] = sortValue.split('-');

    return { field, direction };
}
