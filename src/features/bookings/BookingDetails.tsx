import Row from '@/ui/Row';
import Tag from '@/ui/Tag';
import Empty from '@/ui/Empty';
import Modal from '@/ui/Modal';
import Button from '@/ui/Button';
import Heading from '@/ui/Heading';
import Spinner from '@/ui/Spinner';
import ButtonGroup from '@/ui/ButtonGroup';
import BookingDataBox from './BookingDataBox';
import ConfirmDelete from '@/ui/ConfirmDelete';

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
    const { isUpdating, isDeleting, handleUpdateBooking, handleDeleteBooking } =
        useBookingMutation();

    if (isLoading) return <Spinner />;
    if (!singleBooking) return <Empty resourceName="booking" />;

    const { status, id: bookingId } = singleBooking;

    const isStatusCheckIn = status === 'checked-in';
    const isStatusCheckOut = status === 'checked-out';
    const isStatusUnconfirmed = status === 'unconfirmed';

    const handleCheckOut = () => {
        const payload = { status: 'checked-out' };

        handleUpdateBooking({
            payload,
            id: bookingId,
        });
    };

    const onDeleteBooking = () => {
        handleDeleteBooking(bookingId, {
            onSettled: () => moveBack(),
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
            <Modal>
                <ButtonGroup>
                    <Button variation="secondary" onClick={moveBack}>
                        Back
                    </Button>
                    {isStatusUnconfirmed && (
                        <Button
                            onClick={() => navigate(`/checkin/${bookingId}`)}
                        >
                            Check in
                        </Button>
                    )}
                    {isStatusCheckIn && (
                        <Button onClick={handleCheckOut} disabled={isUpdating}>
                            Check out
                        </Button>
                    )}
                    {isStatusCheckOut && (
                        <Modal.OpenWindow opens="delete-booking">
                            <Button variation="danger" disabled={isDeleting}>
                                Delete
                            </Button>
                        </Modal.OpenWindow>
                    )}
                </ButtonGroup>
                <Modal.Window name="delete-booking">
                    <ConfirmDelete
                        isDisabled={isDeleting}
                        onConfirm={onDeleteBooking}
                        resourceName={`booking #${bookingId}`}
                    />
                </Modal.Window>
            </Modal>
        </>
    );
}
