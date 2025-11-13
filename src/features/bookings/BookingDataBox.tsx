import {
    HiOutlineHomeModern,
    HiOutlineCheckCircle,
    HiOutlineCurrencyDollar,
    HiOutlineChatBubbleBottomCenterText,
} from 'react-icons/hi2';

import Flag from '@/ui/Flag';
import DataItem from '@/ui/DataItem';

import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import { SingleBooking } from '@/lib/supabase/services/types/types';
import { formatCurrency, formatDistanceFromNow } from '@/utils/helpers';

type PriceProps = {
    isPaid: boolean | null;
};

type BookingDetailsProps = {
    booking: SingleBooking;
};

const StyledBookingDataBox = styled.section`
    overflow: hidden;
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-grey-100);
`;

const Header = styled.header`
    color: #e0e7ff;
    font-weight: 500;
    font-size: 1.8rem;
    padding: 2rem 4rem;
    background-color: var(--color-brand-500);

    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
        height: 3.2rem;
        width: 3.2rem;
    }

    & div:first-child {
        gap: 1.6rem;
        display: flex;
        align-items: center;

        font-weight: 600;
        font-size: 1.8rem;
    }

    & span {
        font-size: 2rem;
        margin-left: 4px;
        font-family: 'Sono';
    }
`;

const Section = styled.section`
    padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
    gap: 1.2rem;
    display: flex;
    align-items: center;

    margin-bottom: 1.6rem;
    color: var(--color-grey-500);

    & p:first-of-type {
        font-weight: 500;
        color: var(--color-grey-700);
    }
`;

const Price = styled.div<PriceProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 2.4rem;
    padding: 1.6rem 3.2rem;
    border-radius: var(--border-radius-sm);

    background-color: ${({ isPaid }) =>
        isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};

    color: ${({ isPaid }) =>
        isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

    & p:last-child {
        font-weight: 600;
        font-size: 1.4rem;
        text-transform: uppercase;
    }

    svg {
        width: 2.4rem;
        height: 2.4rem;
        color: currentColor !important;
    }
`;

const Footer = styled.footer`
    font-size: 1.2rem;
    text-align: right;
    padding: 1.6rem 4rem;
    color: var(--color-grey-500);
`;

export default function BookingDataBox({ booking }: BookingDetailsProps) {
    const {
        cabins,
        isPaid,
        guests,
        endDate,
        startDate,
        numNights,
        numGuests,
        totalPrice,
        cabinPrice,
        created_at,
        extrasPrice,
        hasBreakfast,
        observations,
    } = booking;

    const { name: cabinName } = cabins!;
    const { email, nationalID, countryFlag, fullName: guestName } = guests!;

    const bookingDistanceFromNow = isToday(new Date(startDate!))
        ? 'Today'
        : formatDistanceFromNow(startDate!);

    const formattedStartDate = format(new Date(startDate!), 'MMM dd yyyy');
    const formattedEndDate = format(new Date(endDate!), 'MMM dd yyyy');

    const formattedCreatedAt = format(
        new Date(created_at),
        'EEE, MMM dd yyyy, p'
    );

    return (
        <StyledBookingDataBox>
            <Header>
                <div>
                    <HiOutlineHomeModern />
                    <p>
                        {numNights} nights in Cabin <span>{cabinName}</span>
                    </p>
                </div>
                <p>
                    {formattedStartDate} ({bookingDistanceFromNow}) &mdash;{' '}
                    {formattedEndDate}
                </p>
            </Header>
            <Section>
                <Guest>
                    {countryFlag && (
                        <Flag
                            src={countryFlag}
                            alt={`Flag of ${countryFlag}`}
                        />
                    )}
                    <p>
                        {guestName}{' '}
                        {numGuests! > 1 ? `+ ${numGuests! - 1} guests` : ''}
                    </p>
                    <span>&bull;</span>
                    <p>{email}</p>
                    <span>&bull;</span>
                    <p>National ID {nationalID}</p>
                </Guest>
                {observations && (
                    <DataItem
                        label="Observations"
                        icon={<HiOutlineChatBubbleBottomCenterText />}
                    >
                        {observations}
                    </DataItem>
                )}
                <DataItem
                    label="Breakfast included?"
                    icon={<HiOutlineCheckCircle />}
                >
                    {hasBreakfast ? 'Yes' : 'No'}
                </DataItem>
                <Price isPaid={isPaid}>
                    <DataItem
                        icon={<HiOutlineCurrencyDollar />}
                        label={`Total price`}
                    >
                        {formatCurrency(totalPrice!)}
                        {hasBreakfast &&
                            ` (${formatCurrency(
                                cabinPrice!
                            )} cabin + ${formatCurrency(
                                extrasPrice!
                            )} breakfast)`}
                    </DataItem>
                    <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
                </Price>
            </Section>
            <Footer>
                <p>Booked {formattedCreatedAt}</p>
            </Footer>
        </StyledBookingDataBox>
    );
}
