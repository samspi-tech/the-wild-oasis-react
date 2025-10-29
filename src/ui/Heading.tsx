import styled from 'styled-components';

type HeadingProps = {
    center?: boolean;
};

const Heading = styled.h1<HeadingProps>`
    font-weight: 600;
    line-height: 1.4;

    ${({ center }) => center && 'text-align: center;'}
`;

export default Heading;
