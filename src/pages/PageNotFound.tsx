import Button from '../ui/Button';
import Heading from '../ui/Heading';
import styled from 'styled-components';
import { useMoveBack } from '../hooks/useMoveBack';

const StyledPageNotFound = styled.main`
    height: 100vh;
    display: flex;
    padding: 4.8rem;
    align-items: center;
    justify-content: center;
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
        margin-bottom: 3.2rem;
    }
`;

export default function PageNotFound() {
    const moveBack = useMoveBack();

    return (
        <StyledPageNotFound>
            <Box>
                <Heading as="h1">
                    The page you are looking for could not be found 😢
                </Heading>
                <Button onClick={moveBack} size="large">
                    &larr; Go back
                </Button>
            </Box>
        </StyledPageNotFound>
    );
}
