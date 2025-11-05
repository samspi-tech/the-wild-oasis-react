import ButtonIcon from './ButtonIcon';
import ThemeToggle from './ThemeToggle';
import Logout from '@/features/auth/Logout';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUser } from 'react-icons/hi2';

const StyledHeaderMenu = styled.ul`
    gap: 0.4rem;
    display: flex;
`;

export default function HeaderMenu() {
    const navigate = useNavigate();

    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={() => navigate('/account')}>
                    <HiOutlineUser />
                </ButtonIcon>
            </li>
            <li>
                <ThemeToggle />
            </li>
            <li>
                <Logout />
            </li>
        </StyledHeaderMenu>
    );
}
