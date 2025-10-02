import styled, { css } from 'styled-components';

const sizes = {
    small: css`
        font-weight: 600;
        font-size: 1.2rem;
        text-align: center;
        padding: 0.4rem 0.8rem;
        text-transform: uppercase;
    `,
    medium: css`
        font-weight: 500;
        font-size: 1.4rem;
        padding: 1.2rem 1.6rem;
    `,
    large: css`
        font-weight: 500;
        font-size: 1.6rem;
        padding: 1.2rem 2.4rem;
    `,
};

const variations = {
    primary: css`
        color: var(--color-brand-50);
        background-color: var(--color-brand-600);

        &:hover {
            background-color: var(--color-brand-700);
        }
    `,
    secondary: css`
        color: var(--color-grey-600);
        background: var(--color-grey-0);
        border: 1px solid var(--color-grey-200);

        &:hover {
            background-color: var(--color-grey-50);
        }
    `,
    danger: css`
        color: var(--color-red-100);
        background-color: var(--color-red-700);

        &:hover {
            background-color: var(--color-red-800);
        }
    `,
};

type ButtonProps = {
    size?: 'small' | 'medium' | 'large';
    variation?: 'primary' | 'secondary' | 'danger';
};

const Button = styled.button<ButtonProps>`
    border: none;
    box-shadow: var(--shadow-sm);
    border-radius: var(--border-radius-sm);

    ${({ size }) => sizes[size!]}
    ${({ variation }) => variations[variation!]}
`;

Button.defaultProps = {
    size: 'medium',
    variation: 'primary',
};

export default Button;
