import { type MouseEvent } from 'react';
import { EIGHT_PIXELS } from './amounts';

export function getMenuButtonPosition(e: MouseEvent) {
    if (e.target instanceof Element) {
        const button = e.target.closest('button');
        const buttonRect = button?.getBoundingClientRect()!;

        const buttonPosition = {
            y: buttonRect.y + buttonRect.height + EIGHT_PIXELS,
            x: window.innerWidth - buttonRect.width - buttonRect.x,
        };

        return buttonPosition;
    }
}
