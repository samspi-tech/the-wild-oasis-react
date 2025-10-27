import styled from 'styled-components';

const ButtonText = styled.button`
    border: none;
    background: none;
    font-weight: 500;
    text-align: center;
    transition: all 0.3s;
    color: var(--color-brand-600);
    border-radius: var(--border-radius-sm);

    &:hover,
    &:active {
        color: var(--color-brand-700);
    }
`;

export default ButtonText;
