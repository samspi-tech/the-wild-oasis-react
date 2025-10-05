import { Toaster } from 'react-hot-toast';

export default function Toast() {
    const options = {
        success: {
            duration: 3000,
        },
        error: {
            duration: 5000,
        },
        style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            color: 'var(--color-grey-700)',
            backgroundColor: 'var(--color-grey-0)',
        },
    };

    return (
        <Toaster
            gutter={12}
            position="top-center"
            toastOptions={options}
            containerStyle={{ margin: '8px' }}
        />
    );
}
