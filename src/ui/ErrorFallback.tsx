import Button from './Button';
import Heading from './Heading';
import styled from 'styled-components';
import GlobalStyles from '@/styles/GlobalStyles';

type ErrorFallbackProps = {
    error: Error;
    resetErrorBoundary: () => void;
};

const StyledErrorFallback = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100vh;
    padding: 4.8rem;
    background-color: var(--color-grey-50);
`;

const Box = styled.div`
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-grey-100);

    flex: 0 1 96rem;
    padding: 4.8rem;
    text-align: center;

    & h1 {
        margin-bottom: 1.6rem;
    }

    & p {
        font-family: 'Sono';
        margin-bottom: 3.2rem;
        color: var(--color-grey-500);
    }
`;

export default function ErrorFallback({
    error,
    resetErrorBoundary,
}: ErrorFallbackProps) {
    return (
        <>
            <GlobalStyles />
            <StyledErrorFallback>
                <Box>
                    <Heading as="h1">Oops, something went wrong! 😯</Heading>
                    <p>error: {error.message}</p>
                    <Button size="large" onClick={resetErrorBoundary}>
                        Try again
                    </Button>
                </Box>
            </StyledErrorFallback>
        </>
    );
}
