import { PAGE_SIZE } from '@/utils/amounts';
import { useSearchParams } from 'react-router-dom';
import { getCurrentPage } from '@/utils/paginationHelpers';

export default function usePagination(totalCount: number) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = getCurrentPage(searchParams);

    const pageCount = Math.ceil(totalCount / PAGE_SIZE);

    const isStartingPageCount = currentPage === 1;
    const isLastPageCount = currentPage === pageCount;

    const handleNextPage = () => {
        const next = isLastPageCount ? currentPage : currentPage + 1;

        searchParams.set('page', String(next));
        setSearchParams(searchParams);
    };

    const handlePrevPage = () => {
        const prev = isStartingPageCount ? currentPage : currentPage - 1;

        searchParams.set('page', String(prev));
        setSearchParams(searchParams);
    };

    const startingIndex = (currentPage - 1) * PAGE_SIZE + 1;

    const skipPage = currentPage * PAGE_SIZE;
    const lastIndex = isLastPageCount ? totalCount : skipPage;

    return {
        startingIndex,
        lastIndex,
        isStartingPageCount,
        isLastPageCount,
        handleNextPage,
        handlePrevPage,
    };
}
