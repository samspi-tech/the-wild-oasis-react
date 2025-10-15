export function formatCurrency(value: number) {
    new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
        value
    );
}
