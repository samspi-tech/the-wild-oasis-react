import Tag from '@/ui/Tag';
import Flag from '@/ui/Flag';
import Button from '@/ui/Button';
import CheckoutButton from './CheckoutButton';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { type Activities } from '@/lib/supabase/services/types/types';

type TodayItemsProps = {
    activity: Activities;
};

const StyledTodayItem = styled.li`
    gap: 1.2rem;
    display: grid;
    align-items: center;

    font-size: 1.4rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--color-grey-100);
    grid-template-columns: 9rem 2rem 1fr 7rem 9rem;

    &:first-child {
        border-top: 1px solid var(--color-grey-100);
    }
`;

const Guest = styled.div`
    font-weight: 500;
`;

export default function TodayItems({ activity }: TodayItemsProps) {
    const { id, status, guests, numNights } = activity;

    const isStatusCheckedIn = status === 'checked-in';
    const isStatusUnconfirmed = status === 'unconfirmed';

    return (
        <StyledTodayItem>
            {isStatusUnconfirmed && <Tag type="green">Arriving</Tag>}
            {isStatusCheckedIn && <Tag type="blue">Departing</Tag>}
            <Flag
                src={guests?.countryFlag ?? ''}
                alt={`Flag of ${guests?.countryFlag}`}
            />
            <Guest>{guests?.fullName}</Guest>
            <div>{numNights} nights</div>
            {isStatusUnconfirmed && (
                <Button
                    as={Link}
                    size="small"
                    variation="primary"
                    to={`/checkin/${id}`}
                >
                    Check in
                </Button>
            )}
            {isStatusCheckedIn && <CheckoutButton bookingId={id} />}
        </StyledTodayItem>
    );
}
