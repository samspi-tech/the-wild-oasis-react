import Row from '@/ui/Row';
import Tag from '@/ui/Tag';
import Button from '@/ui/Button';
import Heading from '@/ui/Heading';
import Spinner from '@/ui/Spinner';
import ButtonGroup from '@/ui/ButtonGroup';
import BookingDataBox from './BookingDataBox';

import styled from 'styled-components';
import { statusToTagName } from './dataSource';
import { useNavigate } from 'react-router-dom';
import { useMoveBack } from '@/hooks/useMoveBack';
import { type StatusToTagName } from './BookingRow';
import { HiChatBubbleBottomCenterText } from 'react-icons/hi2';
import useBookingMutation from '@/reactQuery/mutations/useBookingMutation';
import useSingleBookingQuery from '@/reactQuery/queries/useSingleBookingQuery';

const HeadingGroup = styled.div`
    gap: 2.4rem;
    display: flex;
    align-items: center;
`;

export default function BookingDetails() {
    const moveBack = useMoveBack();
    const navigate = useNavigate();
    const { isLoading, singleBooking } = useSingleBookingQuery();
    const { isPending, handleUpdateBooking } = useBookingMutation();

    if (!singleBooking) return;
    if (isLoading) return <Spinner />;

    const { status, id: bookingId } = singleBooking;

    const isStatusCheckIn = status === 'checked-in';
    const isStatusUnconfirmed = status === 'unconfirmed';

    const handleCheckOut = () => {
        const payload = { status: 'checked-out' };

        handleUpdateBooking({
            payload,
            id: bookingId,
        });
    };

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag
                        type={statusToTagName[status as keyof StatusToTagName]}
                    >
                        {status?.replace('-', ' ')}
                    </Tag>
                </HeadingGroup>
                <HiChatBubbleBottomCenterText onClick={moveBack}>
                    &larr; Back
                </HiChatBubbleBottomCenterText>
            </Row>
            <BookingDataBox booking={singleBooking} />
            <ButtonGroup>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
                {isStatusUnconfirmed && (
                    <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                        Check in
                    </Button>
                )}
                {isStatusCheckIn && (
                    <Button onClick={handleCheckOut} disabled={isPending}>
                        Check out
                    </Button>
                )}
            </ButtonGroup>
        </>
    );
}
