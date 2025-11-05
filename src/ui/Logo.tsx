import styled from 'styled-components';
import useDarkMode from '@/hooks/useDarkMode';

const StyledLogo = styled.div`
    text-align: center;
`;

const Img = styled.img`
    width: auto;
    height: 9.6rem;
`;

export default function Logo() {
    const { isDarkMode } = useDarkMode();
    const src = isDarkMode ? '/logo-dark.png' : '/logo-light.png';

    return (
        <StyledLogo>
            <Img src={src} alt="Logo" />
        </StyledLogo>
    );
}
