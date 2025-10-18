import Modal from '@/ui/Modal';
import Button from '@/ui/Button';
import CabinTable from './CabinTable';
import CreateCabinForm from './CreateCabinForm';

export default function AddCabin() {
    return (
        <Modal>
            <Modal.OpenWindow opens="cabin-form">
                <Button>Add cabin</Button>
            </Modal.OpenWindow>
            <Modal.Window name="cabin-form">
                <CreateCabinForm />
            </Modal.Window>

            <Modal.OpenWindow opens="table">
                <Button>Add table</Button>
            </Modal.OpenWindow>
            <Modal.Window name="table">
                <CabinTable />
            </Modal.Window>
        </Modal>
    );
}
