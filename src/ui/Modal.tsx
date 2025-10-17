import styled from 'styled-components';
import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;

    transition: all 0.5s;

    padding: 3.2rem 4rem;
    box-shadow: var(--shadow-lg);
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;

    transition: all 0.5s;

    width: 100%;
    height: 100vh;
    z-index: 1000;
    backdrop-filter: blur(4px);
    background-color: var(--backdrop-color);
`;

const Button = styled.button`
    position: absolute;
    right: 1.9rem;
    top: 1.2rem;

    transition: all 0.2s;

    border: none;
    padding: 0.4rem;
    background: none;
    transform: translateX(0.8rem);
    border-radius: var(--border-radius-sm);

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;

type ModalProps = {
    onClose: () => void;
    children: ReactNode;
};

export default function Modal({ children, onClose }: ModalProps) {
    return createPortal(
        <Overlay>
            <StyledModal>
                <Button onClick={onClose} aria-label="Close modal">
                    <HiXMark />
                </Button>
                <div>{children}</div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}
