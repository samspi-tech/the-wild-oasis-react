import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { type Cabins } from '../../lib/supabase/services/cabin.service';

const TableRow = styled.div`
    display: grid;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    width: 6.4rem;
    display: block;
    object-fit: cover;
    aspect-ratio: 3 / 2;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-weight: 600;
    font-size: 1.6rem;
    font-family: 'Sono';
    color: var(--color-grey-600);
`;

const Price = styled.div`
    font-weight: 600;
    font-family: 'Sono';
`;

const Discount = styled.div`
    font-weight: 500;
    font-family: 'Sono';
    color: var(--color-green-700);
`;

type CabinRowProps = {
    cabin: Cabins;
};

export default function CabinRow({ cabin }: CabinRowProps) {
    const { name, image, maxCapacity, regularPrice, discount } = cabin;

    return (
        <TableRow>
            <Img src={image!} alt="Cabin image" />
            <Cabin>{name}</Cabin>
            <p>Fits up to {maxCapacity} guests</p>
            <Price>{formatCurrency(regularPrice!)}</Price>
            <Discount>{discount}</Discount>
            <button>Delete</button>
        </TableRow>
    );
}
