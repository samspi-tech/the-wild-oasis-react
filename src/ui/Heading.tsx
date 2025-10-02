import styled from 'styled-components';

type HeadingProps = {
    as: string;
};

const Heading = styled.h1<HeadingProps>`
    ${(props) => props.as}

    font-weight: 600;
    line-height: 1.4;
`;

export default Heading;
