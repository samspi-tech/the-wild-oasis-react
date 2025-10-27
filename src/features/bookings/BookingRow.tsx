import Tag from '@/ui/Tag';
import Table from '@/ui/Table';
import Menus from '@/ui/Menus';

import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import { statusToTagName } from './dataSource';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, formatDistanceFromNow } from '@/utils/helpers';
import { type AllBookings } from '@/lib/supabase/services/bookings.service';
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye } from 'react-icons/hi2';
import useBookingMutation from '@/reactQuery/mutations/useBookingMutation';

type BookingRowProps = {
    booking: AllBookings;
};

export type StatusToTagName = {
    unconfirmed: string;
    'checked-in': string;
    'checked-out': string;
};

const Cabin = styled.div`
    font-weight: 600;
    font-size: 1.6rem;
    font-family: 'Sono';
    color: var(--color-grey-600);
`;

const Stacked = styled.div`
    gap: 0.2rem;
    display: flex;
    flex-direction: column;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        font-size: 1.2rem;
        color: var(--color-grey-500);
    }
`;

const Amount = styled.div`
    font-weight: 500;
    font-family: 'Sono';
`;

export default function BookingRow({ booking }: BookingRowProps) {
    const { isPending, handleUpdateBooking } = useBookingMutation();

    const {
        status,
        guests,
        cabins,
        endDate,
        startDate,
        numNights,
        totalPrice,
        id: bookingId,
    } = booking;

    const navigate = useNavigate();

    const { name: cabinName } = cabins!;
    const { fullName: guestName, email } = guests!;

    const bookingDistanceFromNow = isToday(new Date(startDate!))
        ? 'Today'
        : formatDistanceFromNow(startDate!);

    const formattedStartDate = format(new Date(startDate!), 'MMM dd yyyy');
    const formattedEndDate = format(new Date(endDate!), 'MMM dd yyyy');

    const isStatusCheckedIn = status === 'checked-in';
    const isStatusUnconfirmed = status === 'unconfirmed';

    const handleCheckOut = () => {
        const payload = { status: 'checked-out' };

        handleUpdateBooking({
            payload,
            id: bookingId,
        });
    };

    return (
        <Table.Row>
            <Cabin>{cabinName}</Cabin>
            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>
            <Stacked>
                <span>
                    {bookingDistanceFromNow} &rarr; {numNights} night stay
                </span>
                <span>
                    {formattedStartDate} &mdash; {formattedEndDate}
                </span>
            </Stacked>
            <Tag type={statusToTagName[status as keyof StatusToTagName]}>
                {status?.replace('-', ' ')}
            </Tag>
            <Amount>{formatCurrency(totalPrice!)}</Amount>
            <Menus.Menu>
                <Menus.Toggles id={bookingId} />
                <Menus.List id={bookingId}>
                    <Menus.Button
                        icon={<HiEye />}
                        onClick={() => navigate(`/bookings/${bookingId}`)}
                    >
                        See details
                    </Menus.Button>
                    {isStatusUnconfirmed && (
                        <Menus.Button
                            icon={<HiArrowDownOnSquare />}
                            onClick={() => navigate(`/checkin/${bookingId}`)}
                        >
                            Check in
                        </Menus.Button>
                    )}
                    {isStatusCheckedIn && (
                        <Menus.Button
                            isDisabled={isPending}
                            onClick={handleCheckOut}
                            icon={<HiArrowUpOnSquare />}
                        >
                            Check out
                        </Menus.Button>
                    )}
                </Menus.List>
            </Menus.Menu>
        </Table.Row>
    );
}
