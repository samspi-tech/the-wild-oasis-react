import styled from 'styled-components';
import { PAGE_SIZE } from '@/utils/amounts';
import usePagination from '@/hooks/usePagination';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

type PaginationProps = {
    totalCount: number;
};

const StyledPagination = styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Paragraph = styled.p`
    font-size: 1.4rem;
    margin-left: 0.8rem;

    & span {
        font-weight: 600;
    }
`;

const Buttons = styled.div`
    gap: 0.6rem;
    display: flex;
`;

const PaginationButton = styled.button`
    border: none;
    font-weight: 500;
    font-size: 1.4rem;
    transition: all 0.3s;
    padding: 0.6rem 1.2rem;
    border-radius: var(--border-radius-sm);

    gap: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:has(span:last-child) {
        padding-left: 0.4rem;
    }

    &:has(span:first-child) {
        padding-right: 0.4rem;
    }

    & svg {
        width: 1.8rem;
        height: 1.8rem;
    }

    &:hover:not(:disabled) {
        color: var(--color-brand-50);
        background-color: var(--color-brand-600);
    }
`;

export default function Pagination({ totalCount }: PaginationProps) {
    const {
        startingIndex,
        lastIndex,
        isStartingPageCount,
        isLastPageCount,
        handleNextPage,
        handlePrevPage,
    } = usePagination(totalCount);

    if (totalCount <= PAGE_SIZE) return;

    return (
        <StyledPagination>
            <Paragraph>
                Showing <span>{startingIndex}</span> to <span>{lastIndex}</span>{' '}
                of <span>{totalCount}</span> results
            </Paragraph>
            <Buttons>
                <PaginationButton
                    onClick={handlePrevPage}
                    disabled={isStartingPageCount}
                >
                    <HiChevronLeft /> <span>Previous</span>
                </PaginationButton>
                <PaginationButton
                    onClick={handleNextPage}
                    disabled={isLastPageCount}
                >
                    <span>Next</span> <HiChevronRight />
                </PaginationButton>
            </Buttons>
        </StyledPagination>
    );
}
