import styled, { css } from 'styled-components';

const horizontal = css`
    align-items: center;
    justify-content: space-between;
`;

const vertical = css`
    gap: 1.6rem;
    flex-direction: column;
`;

type RowProps = {
    type?: 'horizontal' | 'vertical';
};

const Row = styled.div<RowProps>`
    display: flex;

    ${({ type }) => (type === 'horizontal' ? horizontal : vertical)}
`;

Row.defaultProps = {
    type: 'vertical',
};

export default Row;
