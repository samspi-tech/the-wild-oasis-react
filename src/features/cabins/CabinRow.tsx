import styled from 'styled-components';
import { formatCurrency } from '@/utils/helpers';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { type Cabins } from '@/lib/supabase/services/cabin.service';
import { useCabinMutation } from '@/reactQuery/mutations/useCabinMutation';

import Menus from '@/ui/Menus';
import Table from '@/ui/Table';
import Modal from '@/ui/Modal';
import ConfirmDelete from '@/ui/ConfirmDelete';
import CreateCabinForm from './CreateCabinForm';

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
        <Table.Row>
            <Img src={image!} alt="Cabin image" />
            <Cabin>{name}</Cabin>
            <p>Fits up to {maxCapacity} guests</p>
            <Price>{formatCurrency(regularPrice!)}</Price>
            <Discount>
                {discount ? formatCurrency(discount) : <span>&mdash;</span>}
            </Discount>
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggles id={id} />

                        <Menus.List id={id}>
                            <Menus.Button
                                isDisabled={isCreating}
                                icon={<HiSquare2Stack />}
                                onClick={handleDuplicateCabin}
                            >
                                Duplicate
                            </Menus.Button>

                            <Modal.OpenWindow opens="update-form">
                                <Menus.Button icon={<HiPencil />}>
                                    Edit
                                </Menus.Button>
                            </Modal.OpenWindow>

                            <Modal.OpenWindow opens="delete-cabin">
                                <Menus.Button icon={<HiTrash />}>
                                    Delete
                                </Menus.Button>
                            </Modal.OpenWindow>
                        </Menus.List>

                        <Modal.Window name="update-form">
                            <CreateCabinForm cabin={cabin} />
                        </Modal.Window>

                        <Modal.Window name="delete-cabin">
                            <ConfirmDelete
                                isDisabled={isDeleting}
                                resourceName={`cabin ${name}`}
                                onConfirm={() => handleDeleteCabin(id)}
                            />
                        </Modal.Window>
                    </Menus.Menu>
                </Modal>
            </div>
        </Table.Row>
    );
}
