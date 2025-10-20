import styled from 'styled-components';

import CreateCabinForm from './CreateCabinForm';
import { formatCurrency } from '@/utils/helpers';
import { type Cabins } from '@/lib/supabase/services/cabin.service';
import { useCabinMutation } from '@/reactQuery/mutations/useCabinMutation';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import Modal from '@/ui/Modal';
import ConfirmDelete from '@/ui/ConfirmDelete';

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
    const { id, name, image, maxCapacity, regularPrice, discount } = cabin;

    const { handleDeleteCabin, isDeleting, handleCreateCabin, isCreating } =
        useCabinMutation({});

    const handleDuplicateCabin = () => {
        const payload = {
            id: cabin.id,
            image: cabin.image!,
            discount: cabin.discount!,
            name: `Copy of ${cabin.name}`,
            maxCapacity: cabin.maxCapacity!,
            description: cabin.description!,
            regularPrice: cabin.regularPrice!,
        };

        handleCreateCabin(payload);
    };

    return (
        <>
            <TableRow>
                <Img src={image!} alt="Cabin image" />
                <Cabin>{name}</Cabin>
                <p>Fits up to {maxCapacity} guests</p>
                <Price>{formatCurrency(regularPrice!)}</Price>
                <Discount>
                    {discount ? formatCurrency(discount) : <span>&mdash;</span>}
                </Discount>
                <div>
                    <button
                        disabled={isCreating}
                        aria-label="Duplicate cabin"
                        onClick={handleDuplicateCabin}
                    >
                        <HiSquare2Stack />
                    </button>
                    <Modal>
                        <Modal.OpenWindow opens="update-form">
                            <button aria-label="Show or hide update cabin form">
                                <HiPencil />
                            </button>
                        </Modal.OpenWindow>
                        <Modal.Window name="update-form">
                            <CreateCabinForm cabin={cabin} />
                        </Modal.Window>
                        <Modal.OpenWindow opens="delete-cabin">
                            <button aria-label="Delete cabin">
                                <HiTrash />
                            </button>
                        </Modal.OpenWindow>
                        <Modal.Window name="delete-cabin">
                            <ConfirmDelete
                                isDisabled={isDeleting}
                                resourceName={`cabin ${name}`}
                                onConfirm={() => handleDeleteCabin(id)}
                            />
                        </Modal.Window>
                    </Modal>
                </div>
            </TableRow>
        </>
    );
}
