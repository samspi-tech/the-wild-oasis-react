import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const StyledAppLayout = styled.div`
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 26rem 1fr;
`;

const Main = styled.main`
    padding: 4rem 4.8rem 6.4rem;
    background-color: var(--color-grey-50);
`;

const Container = styled.div`
    margin: 0 auto;
    max-width: 120rem;

    gap: 3.2rem;
    display: flex;
    flex-direction: column;
`;

export default function AppLayout() {
    return (
        <StyledAppLayout>
            <Header />
            <Sidebar />
            <Main>
                <Container>
                    <Outlet />
                </Container>
            </Main>
        </StyledAppLayout>
    );
}
