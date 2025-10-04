import Row from '../ui/Row';
import { useEffect } from 'react';
import Heading from '../ui/Heading';
import { getAllCabins } from '../lib/supabase/services/cabin.service';

export default function Cabins() {
    useEffect(() => {
        getAllCabins().then((data) => console.log(data));
    }, []);

    return (
        <Row type="horizontal">
            <Heading as="h1">All cabins</Heading>
            <p>TEST</p>
        </Row>
    );
}
