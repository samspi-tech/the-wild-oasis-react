import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '@/features/auth/UserAvatar';

const StyledHeader = styled.header`
    padding: 1.2rem 4.8rem;
    background-color: var(--color-grey-0);
    border-bottom: 1px solid var(--color-grey-100);

    gap: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export default function Header() {
    return (
        <StyledHeader>
            <UserAvatar />
            <HeaderMenu />
        </StyledHeader>
    );
}
