import styled, { css } from 'styled-components';

const TypeIsModal = css`
    width: 80rem;
`;

const TypeIsNotModal = css`
    padding: 2.4rem 4rem;
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-grey-100);
`;

type FormProps = {
    type?: 'modal';
};

const Form = styled.form<FormProps>`
    overflow: hidden;
    font-size: 1.4rem;

    ${({ type }) => type === 'modal' && TypeIsModal}
    ${({ type }) => type !== 'modal' && TypeIsNotModal}
`;

export default Form;
