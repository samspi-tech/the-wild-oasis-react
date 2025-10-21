import { type MouseEvent } from 'react';
import { EIGHT_PIXELS } from './amounts';

export function getMenuButtonPosition(e: MouseEvent) {
    if (e.target instanceof Element) {
        const button = e.target.closest('button');
        const rect = button?.getBoundingClientRect();

        return {
            x: window.innerWidth - rect!.width - rect!.x,
            y: rect!.y + rect!.height + EIGHT_PIXELS,
        };
    }
}
