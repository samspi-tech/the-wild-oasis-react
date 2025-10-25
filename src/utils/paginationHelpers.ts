import { type SetURLSearchParams } from 'react-router-dom';

export function getCurrentPage(searchParams: URLSearchParams) {
    const pageValue = searchParams.get('page');
    const currentPage = !pageValue ? 1 : Number(pageValue);

    return currentPage;
}

export function handlePageReset(
    searchParams: URLSearchParams,
    setSearchParams: SetURLSearchParams
) {
    const currentPage = searchParams.get('page');

    if (currentPage) {
        searchParams.set('page', '1');
        setSearchParams(searchParams);
    }
}
