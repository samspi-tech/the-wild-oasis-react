import Row from '@/ui/Row';
import Tag from '@/ui/Tag';
import Button from '@/ui/Button';
import Heading from '@/ui/Heading';
import Spinner from '@/ui/Spinner';
import ButtonGroup from '@/ui/ButtonGroup';
import BookingDataBox from './BookingDataBox';

import styled from 'styled-components';
import { statusToTagName } from './dataSource';
import { useMoveBack } from '@/hooks/useMoveBack';
import { type StatusToTagName } from './BookingRow';
import { HiChatBubbleBottomCenterText } from 'react-icons/hi2';
import useSingleBookingQuery from '@/reactQuery/queries/useSingleBookingQuery';

const HeadingGroup = styled.div`
    gap: 2.4rem;
    display: flex;
    align-items: center;
`;

export default function BookingDetails() {
    const moveBack = useMoveBack();
    const { isLoading, singleBooking } = useSingleBookingQuery();

    if (!singleBooking) return;
    if (isLoading) return <Spinner />;

    const { status, id: bookindId } = singleBooking;

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookindId}</Heading>
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
            </ButtonGroup>
        </>
    );
}
