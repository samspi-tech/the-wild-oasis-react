import { useEffect, useRef } from 'react';

type UseOutsideClickArgs = {
    handleClose: () => void;
    isEventCapturing?: boolean;
};

export default function useOutsideClick({
    handleClose,
    isEventCapturing = true,
}: UseOutsideClickArgs) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const currRef = ref.current;
            const target = e.target as Node;
            const isClickOutsideTarget = currRef && !currRef.contains(target);

            if (isClickOutsideTarget) handleClose();
        };

        document.addEventListener(
            'click',
            handleOutsideClick,
            isEventCapturing
        );

        return () => {
            document.removeEventListener(
                'click',
                handleOutsideClick,
                isEventCapturing
            );
        };
    }, [handleClose, isEventCapturing]);

    return ref;
}
