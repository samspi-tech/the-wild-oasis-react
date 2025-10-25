export function getBookingSort(searchParams: URLSearchParams) {
    const sortValue = searchParams.get('sortBy') || 'startDate-asc';

    const [field, direction] = sortValue.split('-');

    return {
        name: field,
        value: direction,
    };
}
