import Stats from './Stats';
import Spinner from '@/ui/Spinner';
import styled from 'styled-components';

import useRecentStays from '@/reactQuery/queries/useRecentStays';
import useRecentBookings from '@/reactQuery/queries/useRecentBookings';
import useCabinQuery from '@/reactQuery/queries/useCabinQuery';

const StyledDashboardLayout = styled.div`
    gap: 2.4rem;
    display: grid;
    grid-template-rows: auto 34rem auto;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export default function DashboardLayout() {
    const { cabins, isLoading } = useCabinQuery();
    const { isLoadingBookings, recentBookings } = useRecentBookings();
    const { isLoadingStays, confirmedStays, numDays } = useRecentStays();

    if (isLoadingBookings || isLoadingStays || isLoading) return <Spinner />;

    return (
        <StyledDashboardLayout>
            <Stats
                numDays={numDays}
                cabinsCount={cabins?.length}
                recentBookings={recentBookings}
                confirmedStays={confirmedStays}
            />
            <div>today's activity</div>
            <div>chart stay duration</div>
            <div>chart sales</div>
        </StyledDashboardLayout>
    );
}
