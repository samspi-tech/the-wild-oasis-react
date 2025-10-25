import { PAGE_SIZE } from './amounts';

export function getPages(searchParams: URLSearchParams) {
    const pageValue = Number(searchParams.get('page'));
    const currentPage = pageValue ?? 1;

    const from = (currentPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    return {
        currentPage,
        from,
        to,
    };
}
