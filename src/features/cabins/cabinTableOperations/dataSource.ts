export type Options = {
    id: string;
    value: string;
    label: string;
}[];

export const cabinFilters: Options = [
    {
        id: 'filter-btn-1',
        value: 'all',
        label: 'All',
    },
    {
        id: 'filter-btn-2',
        value: 'no-discount',
        label: 'No discount',
    },
    {
        id: 'filter-btn-3',
        value: 'with-discount',
        label: 'With discount',
    },
];

export const cabinSorts: Options = [
    {
        id: 'sort-btn-1',
        value: 'name-asc',
        label: 'Sort by name: A-Z',
    },
    {
        id: 'sort-btn-2',
        value: 'name-desc',
        label: 'Sort by name: Z-A',
    },
    {
        id: 'sort-btn-3',
        value: 'regularPrice-asc',
        label: 'Sort by price: Low to high',
    },
    {
        id: 'sort-btn-4',
        value: 'regularPrice-desc',
        label: 'Sort by price: High to low',
    },
    {
        id: 'sort-btn-5',
        value: 'maxCapacity-asc',
        label: 'Sort by capacity: Low to high',
    },
    {
        id: 'sort-btn-6',
        value: 'maxCapacity-desc',
        label: 'Sort by capacity: High to low',
    },
];
