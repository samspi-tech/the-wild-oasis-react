import Tag from '@/ui/Tag';
import Table from '@/ui/Table';

import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import { formatCurrency, formatDistanceFromNow } from '@/utils/helpers';
import { type Bookings } from '@/lib/supabase/services/bookings.service';

type BookingRowProps = {
    booking: Bookings;
};

type StatusToTagName = {
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
    const {
        status,
        guests,
        cabins,
        endDate,
        startDate,
        numNights,
        totalPrice,
    } = booking;

    const { name: cabinName } = cabins!;
    const { fullName: guestName, email } = guests!;

    const bookingDistanceFromNow = isToday(new Date(startDate!))
        ? 'Today'
        : formatDistanceFromNow(startDate!);

    const formattedStartDate = format(new Date(startDate!), 'MMM dd yyyy');
    const formattedEndDate = format(new Date(endDate!), 'MMM dd yyyy');

    const statusToTagName: StatusToTagName = {
        unconfirmed: 'blue',
        'checked-in': 'green',
        'checked-out': 'silver',
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
        </Table.Row>
    );
}
