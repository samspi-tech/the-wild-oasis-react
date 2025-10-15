import { useState } from 'react';

import Row from '@/ui/Row';
import Button from '@/ui/Button';
import Heading from '@/ui/Heading';
import CabinTable from '@/features/cabins/CabinTable';
import CreateCabinForm from '@/features/cabins/CreateCabinForm';

export default function Cabins() {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleFormVisibility = () => {
        setIsFormVisible((prevState) => !prevState);
    };

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All cabins</Heading>
                <p>Filter / Sort</p>
            </Row>
            <Row>
                <CabinTable />
                <Button onClick={handleFormVisibility}>
                    {isFormVisible ? 'Hide form' : 'Add new cabin'}
                </Button>
                {isFormVisible && (
                    <CreateCabinForm onHide={handleFormVisibility} />
                )}
            </Row>
        </>
    );
}
