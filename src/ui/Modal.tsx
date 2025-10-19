import {
    useState,
    useContext,
    cloneElement,
    createContext,
    type ReactNode,
    type ReactElement,
} from 'react';

import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import useOutsideClick from '@/hooks/useOutesideClick';

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;

    padding: 3.2rem 4rem;
    transition: all 0.5s;
    box-shadow: var(--shadow-lg);
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100vh;
    z-index: 1000;
    transition: all 0.5s;
    backdrop-filter: blur(4px);
    background-color: var(--backdrop-color);
`;

const ModalButton = styled.button`
    position: absolute;
    right: 1.9rem;
    top: 1.2rem;

    border: none;
    padding: 0.4rem;
    background: none;
    transition: all 0.2s;
    transform: translateX(0.8rem);
    border-radius: var(--border-radius-sm);

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-500);
    }
`;

type ModalContextValues = {
    openName: string;
    handleClose: () => void;
    handleOpen: (name: string) => void;
};

type ModalProps = {
    children: ReactNode;
};

type OpenWindowProps = {
    opens: string;
    children: ReactElement;
};

type WindowProps = {
    name: string;
    children: ReactElement;
};

const ModalContext = createContext<ModalContextValues | null>(null);

export default function Modal({ children }: ModalProps) {
    const [openName, setOpenName] = useState('');

    const handleClose = () => setOpenName('');
    const handleOpen = (name: string) => setOpenName(name);

    return (
        <ModalContext.Provider
            value={{
                openName,
                handleOpen,
                handleClose,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

function OpenWindow({ children, opens }: OpenWindowProps) {
    const { handleOpen } = useContext(ModalContext)!;

    return cloneElement(children, { onClick: () => handleOpen(opens) });
}

function Window({ children, name }: WindowProps) {
    const { openName, handleClose } = useContext(ModalContext)!;

    const modalRef = useOutsideClick({ handleClose });

    if (name !== openName) return null;

    return createPortal(
        <Overlay>
            <StyledModal ref={modalRef}>
                <ModalButton onClick={handleClose} aria-label="Close modal">
                    <HiXMark />
                </ModalButton>
                <div>{cloneElement(children, { onClose: handleClose })}</div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}

Modal.Window = Window;
Modal.OpenWindow = OpenWindow;
