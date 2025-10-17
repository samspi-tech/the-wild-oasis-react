import { useState } from 'react';

import Modal from '@/ui/Modal';
import Button from '@/ui/Button';
import CreateCabinForm from './CreateCabinForm';

export default function AddCabin() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModalVisibility = () => {
        setIsModalVisible((prevState) => !prevState);
    };

    return (
        <>
            <Button onClick={handleModalVisibility}>
                {isModalVisible ? 'Hide form' : 'Add new cabin'}
            </Button>
            {isModalVisible && (
                <Modal onClose={handleModalVisibility}>
                    <CreateCabinForm onClose={handleModalVisibility} />
                </Modal>
            )}
        </>
    );
}
