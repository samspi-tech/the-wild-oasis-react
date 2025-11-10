import Row from '@/ui/Row';
import Heading from '@/ui/Heading';
import Spinner from '@/ui/Spinner';
import TodayItems from './TodayItem';

import styled from 'styled-components';
import useTodayActivityQuery from '@/reactQuery/queries/useTodayActivityQuery';

const StyledToday = styled.div`
    padding: 3.2rem;
    padding-top: 2.4rem;
    grid-column: 1 / span 2;
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-grey-100);

    gap: 2.4rem;
    display: flex;
    flex-direction: column;
`;

const TodayList = styled.ul`
    overflow: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        width: 0 !important;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
`;

const NoActivity = styled.p`
    font-weight: 500;
    font-size: 1.8rem;
    margin-top: 0.8rem;
    text-align: center;
`;

export default function TodayActivity() {
    const { activities, isLoading } = useTodayActivityQuery();

    const activitiesLength = activities?.length || [].length;
    const hasTodayActivity = activitiesLength > 0;

    return (
        <StyledToday>
            <Row type="horizontal">
                <Heading as="h2">Today</Heading>
            </Row>
            {isLoading && <Spinner />}
            {!isLoading && hasTodayActivity && (
                <TodayList>
                    {activities?.map((activity) => (
                        <TodayItems activity={activity} key={activity.id} />
                    ))}
                </TodayList>
            )}
            {!isLoading && !hasTodayActivity && (
                <NoActivity>No activity today</NoActivity>
            )}
        </StyledToday>
    );
}
