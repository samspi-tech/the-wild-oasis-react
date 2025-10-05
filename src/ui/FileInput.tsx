import styled from 'styled-components';

const FileInput = styled.input`
    font-size: 1.4rem;
    border-radius: var(--border-radius-sm);

    &::file-selector-button {
        border: none;
        font: inherit;
        cursor: pointer;
        font-weight: 500;
        margin-right: 1.2rem;
        padding: 0.8rem 1.2rem;
        color: var(--color-brand-50);
        border-radius: var(--border-radius-sm);
        background-color: var(--color-brand-600);
        transition: color 0.2s, background-color 0.2s;

        &:hover {
            background-color: var(--color-brand-700);
        }
    }
`;

export default FileInput;
