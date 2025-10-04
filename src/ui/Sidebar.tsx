import styled from 'styled-components';

const StyledSidebar = styled.aside`
    grid-row: 1 / -1;
    padding: 3.2rem 2.4rem;
    background-color: var(--color-grey-0);
    border-right: 1px solid var(--color-grey-100);
`;

export default function Sidebar() {
    return <StyledSidebar>sidebar</StyledSidebar>;
}
