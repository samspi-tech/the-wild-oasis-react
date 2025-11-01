import ButtonIcon from './ButtonIcon';
import styled from 'styled-components';
import Logout from '@/features/auth/Logout';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

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
                <Logout />
            </li>
        </StyledHeaderMenu>
    );
}
