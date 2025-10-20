import Modal from '@/ui/Modal';
import Button from '@/ui/Button';
import CreateCabinForm from './CreateCabinForm';

export default function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.OpenWindow opens="cabin-form">
                    <Button>Add cabin</Button>
                </Modal.OpenWindow>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}
