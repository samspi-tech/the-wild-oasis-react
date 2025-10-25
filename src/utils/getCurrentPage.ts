export default function getCurrentPage(searchParams: URLSearchParams) {
    const pageValue = searchParams.get('page');
    const currentPage = !pageValue ? 1 : Number(pageValue);

    return currentPage;
}
