import {
    useState,
    useContext,
    createContext,
    type Dispatch,
    type ReactNode,
    type RefObject,
    type MouseEvent,
    type SetStateAction,
} from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import useOutsideClick from '@/hooks/useOutesideClick';
import { getMenuButtonPosition } from '@/utils/getMenuButtonPosition';

type MenusProps = {
    children: ReactNode;
};

type Position = {
    y: number;
    x: number;
};

type StyledListProps = {
    position: Position;
    ref: RefObject<HTMLDivElement>;
};

type MenusContextValues = {
    openId: string;
    handleClose: () => void;
    menuButtonPosition: Position | null;
    handleOpen: Dispatch<SetStateAction<string>>;
    setMenuButtonPosition: Dispatch<SetStateAction<Position | null>>;
};

type ButtonProps = {
    icon: ReactNode;
    children: ReactNode;
    isDisabled?: boolean;
    onClick?: () => void;
};

type TogglesProps = {
    id: number;
};

type ListProps = {
    id: number;
    children: ReactNode;
};

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
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
        color: var(--color-grey-700);
    }
`;

const StyledList = styled.ul<StyledListProps>`
    position: fixed;
    top: ${({ position }) => position.y}px;
    right: ${({ position }) => position.x}px;

    box-shadow: var(--shadow-md);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-md);
`;

const StyledButton = styled.button`
    width: 100%;
    border: none;
    background: none;
    text-align: left;
    font-size: 1.4rem;
    transition: all 0.2s;
    padding: 1.2rem 2.4rem;

    gap: 1.6rem;
    display: flex;
    align-items: center;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        transition: all 0.3s;
        color: var(--color-grey-400);
    }
`;

const MenusContext = createContext<MenusContextValues | null>(null);

export default function Menus({ children }: MenusProps) {
    const [openId, setOpenId] = useState('');
    const [menuButtonPosition, setMenuButtonPosition] =
        useState<Position | null>(null);

    const handleOpen = setOpenId;
    const handleClose = () => setOpenId('');

    return (
        <MenusContext.Provider
            value={{
                openId,
                handleOpen,
                handleClose,
                menuButtonPosition,
                setMenuButtonPosition,
            }}
        >
            {children}
        </MenusContext.Provider>
    );
}

function Toggles({ id }: TogglesProps) {
    const propId = String(id);
    const { openId, handleOpen, handleClose, setMenuButtonPosition } =
        useContext(MenusContext)!;

    const handleToggle = (e: MouseEvent) => {
        e.stopPropagation();
        const position = getMenuButtonPosition(e)!;
        setMenuButtonPosition(position);

        const isMenuClosed = openId === '';
        const isClickedMenuDifferentThanOneAlreadyOpen = openId !== propId;

        isMenuClosed || isClickedMenuDifferentThanOneAlreadyOpen
            ? handleOpen(propId)
            : handleClose();
    };

    return (
        <StyledToggle aria-label="Toggle menu" onClick={handleToggle}>
            <HiEllipsisVertical />
        </StyledToggle>
    );
}

function List({ id, children }: ListProps) {
    const propId = String(id);
    const { openId, menuButtonPosition, handleClose } =
        useContext(MenusContext)!;

    const listRef = useOutsideClick({ handleClose, isEventCapturing: false });

    if (openId !== propId) return null;

    return createPortal(
        <StyledList ref={listRef} position={menuButtonPosition!}>
            {children}
        </StyledList>,
        document.body
    );
}

function Button({ children, icon, onClick, isDisabled }: ButtonProps) {
    const { handleClose } = useContext(MenusContext)!;

    const handleClick = () => {
        onClick?.();
        handleClose();
    };

    return (
        <li>
            <StyledButton disabled={isDisabled} onClick={handleClick}>
                {icon} <span>{children}</span>
            </StyledButton>
        </li>
    );
}

Menus.List = List;
Menus.Menu = Menu;
Menus.Button = Button;
Menus.Toggles = Toggles;
