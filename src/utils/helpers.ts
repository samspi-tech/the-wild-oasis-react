import { formatDistance, parseISO } from 'date-fns';

export function formatCurrency(value: number) {
    return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
}

export function formatDistanceFromNow(dateStr: string) {
    return formatDistance(parseISO(dateStr), new Date(), {
        addSuffix: true,
    })
        .replace('about ', '')
        .replace('in', 'In');
}

export function toggleTheme(add: string, remove: string) {
    document.documentElement.classList.add(add);
    document.documentElement.classList.remove(remove);
}
