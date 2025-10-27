import Row from '@/ui/Row';
import Button from '@/ui/Button';
import Heading from '@/ui/Heading';
import Spinner from '@/ui/Spinner';
import Checkbox from '@/ui/Checkbox';
import ButtonText from '@/ui/ButtonText';
import ButtonGroup from '@/ui/ButtonGroup';
import BookingDataBox from '../bookings/BookingDataBox';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/utils/helpers';
import { useMoveBack } from '@/hooks/useMoveBack';
import useBookingMutation from '@/reactQuery/mutations/useBookingMutation';
import useSingleBookingQuery from '@/reactQuery/queries/useSingleBookingQuery';

const Box = styled.div`
    padding: 2.4rem 4rem;
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-grey-100);
`;

export default function CheckinBooking() {
    const moveBack = useMoveBack();
    const [isConfirmPaid, setIsConfirmPaid] = useState(false);
    const { isLoading, singleBooking } = useSingleBookingQuery();
    const { isPending, handleUpdateBooking } = useBookingMutation();

    useEffect(() => {
        const isConfirmed = singleBooking?.isPaid ?? false;
        setIsConfirmPaid(isConfirmed);
    }, [singleBooking]);

    if (!singleBooking) return;
    if (isLoading) return <Spinner />;

    const {
        guests,
        numNights,
        numGuests,
        totalPrice,
        hasBreakfast,
        id: bookingId,
    } = singleBooking;

    const { fullName } = guests!;

    const handleIsConfirmPaid = () => {
        setIsConfirmPaid((prevState) => !prevState);
    };

    const handleCheckIn = () => {
        if (!isConfirmPaid) return;

        const payload = {
            isPaid: true,
            status: 'checked-in',
        };

        handleUpdateBooking({
            payload,
            id: bookingId,
        });
    };

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>
            <BookingDataBox booking={singleBooking} />
            <Box>
                <Checkbox
                    id="confirm"
                    isChecked={isConfirmPaid}
                    onChange={handleIsConfirmPaid}
                    isDisabled={isConfirmPaid || isPending}
                >
                    I confirm that {fullName} has paid the total amount of{' '}
                    {formatCurrency(totalPrice!)}
                </Checkbox>
            </Box>
            <ButtonGroup>
                <Button
                    onClick={handleCheckIn}
                    disabled={!isConfirmPaid || isPending}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}
