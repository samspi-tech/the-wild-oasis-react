import styled from 'styled-components';

type TagProps = {
    type: string;
};

const Tag = styled.span<TagProps>`
    font-weight: 600;
    font-size: 1.1rem;
    width: fit-content;
    border-radius: 100px;
    padding: 0.4rem 1.2rem;
    text-transform: uppercase;

    color: var(--color-${({ type }) => type}-700);
    background-color: var(--color-${({ type }) => type}-100);
`;

export default Tag;
