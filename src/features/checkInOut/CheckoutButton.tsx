import Button from '@/ui/Button';
import useBookingMutation from '@/reactQuery/mutations/useBookingMutation';

type CheckoutButtonProps = {
    bookingId: number;
};

export default function CheckoutButton({ bookingId }: CheckoutButtonProps) {
    const { handleUpdateBooking, isUpdating } = useBookingMutation();

    const handleCheckOut = () => {
        const payload = { status: 'checked-out' };

        handleUpdateBooking({
            payload,
            id: bookingId,
        });
    };

    return (
        <Button
            size="small"
            variation="primary"
            disabled={isUpdating}
            onClick={handleCheckOut}
        >
            Check out
        </Button>
    );
}
