import Logo from './Logo';
import MainNav from './MainNav';
import styled from 'styled-components';

const StyledSidebar = styled.aside`
    grid-row: 1 / -1;
    padding: 3.2rem 2.4rem;
    background-color: var(--color-grey-0);
    border-right: 1px solid var(--color-grey-100);

    gap: 3.2rem;
    display: flex;
    flex-direction: column;
`;

export default function Sidebar() {
    return (
        <StyledSidebar>
            <Logo />
            <MainNav />
        </StyledSidebar>
    );
}
