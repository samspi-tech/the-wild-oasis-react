import Row from './ui/Row';
import Input from './ui/Input';
import Button from './ui/Button';
import Heading from './ui/Heading';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

const StyledApp = styled.div`
    padding: 20px;
`;

export default function App() {
    return (
        <>
            <GlobalStyles />
            <StyledApp>
                <Row>
                    <Row type="horizontal">
                        <Heading as="h1">The Wild Oasis</Heading>
                        <div>
                            <Heading as="h2">Check in and out</Heading>
                            <Button>Check in</Button>
                            <Button size="small" variation="secondary">
                                Check out
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <Heading as="h3">Form</Heading>
                        <form>
                            <Input
                                type="number"
                                id="numGuests"
                                placeholder="Number of guests"
                            />
                            <Input
                                type="number"
                                id="numGuests"
                                placeholder="Number of guests"
                            />
                        </form>
                    </Row>
                </Row>
            </StyledApp>
        </>
    );
}
