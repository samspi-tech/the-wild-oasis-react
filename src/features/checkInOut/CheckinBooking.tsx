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
import useSettingsQuery from '@/reactQuery/queries/useSettingsQuery';
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
    const [isAddBreakfast, setIsAddBreakfast] = useState(false);
    const { isLoading, singleBooking } = useSingleBookingQuery();
    const { isPending, handleUpdateBooking } = useBookingMutation();
    const { settings, isLoading: isLoadingSettings } = useSettingsQuery();

    useEffect(() => {
        const isConfirmed = singleBooking?.isPaid ?? false;
        setIsConfirmPaid(isConfirmed);
    }, [singleBooking]);

    if (!singleBooking || !settings) return;
    if (isLoading || isLoadingSettings) return <Spinner />;

    const {
        guests,
        numNights,
        numGuests,
        totalPrice,
        hasBreakfast,
        id: bookingId,
    } = singleBooking;

    const { fullName } = guests!;
    const { breakfastPrice } = settings!;

    const optionalBreakfastPrice = breakfastPrice! * numGuests! * numNights!;
    const totalPriceWithBreakfast = totalPrice! + optionalBreakfastPrice;

    const bookingTotalPrice = isAddBreakfast
        ? totalPriceWithBreakfast
        : totalPrice;

    const handleIsConfirmPaid = () => {
        setIsConfirmPaid((prevState) => !prevState);
    };

    const handleAddBreakfast = () => {
        setIsConfirmPaid(false);
        setIsAddBreakfast((prevState) => !prevState);
    };

    const handleCheckIn = () => {
        if (!isConfirmPaid) return;

        const payload = {
            isPaid: true,
            status: 'checked-in',
        };

        const payloadWithBreakfast = {
            ...payload,
            hasBreakfast: true,
            totalPrice: totalPriceWithBreakfast,
            extrasPrice: optionalBreakfastPrice,
        };

        if (isAddBreakfast) {
            handleUpdateBooking({
                id: bookingId,
                payload: payloadWithBreakfast,
            });
        } else {
            handleUpdateBooking({
                payload,
                id: bookingId,
            });
        }
    };

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>
            <BookingDataBox booking={singleBooking} />
            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        id="add-breakfast"
                        isChecked={isAddBreakfast}
                        onChange={handleAddBreakfast}
                        isDisabled={isAddBreakfast || isPending}
                    >
                        Want to add breakfast for{' '}
                        {formatCurrency(optionalBreakfastPrice)}?
                    </Checkbox>
                </Box>
            )}
            <Box>
                <Checkbox
                    id="confirm-check-in"
                    isChecked={isConfirmPaid}
                    onChange={handleIsConfirmPaid}
                    isDisabled={isConfirmPaid || isPending}
                >
                    I confirm that {fullName} has paid the total amount of{' '}
                    {formatCurrency(bookingTotalPrice!)}
                    {isAddBreakfast && (
                        <span>
                            ({formatCurrency(totalPrice!)} +{' '}
                            {formatCurrency(optionalBreakfastPrice)})
                        </span>
                    )}
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
