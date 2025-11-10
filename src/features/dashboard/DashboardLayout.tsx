import Stats from './Stats';
import Spinner from '@/ui/Spinner';
import SalesChart from './salesChart/SalesChart';

import styled from 'styled-components';
import useCabinQuery from '@/reactQuery/queries/useCabinQuery';
import useRecentStays from '@/reactQuery/queries/useRecentStays';
import useRecentBookings from '@/reactQuery/queries/useRecentBookings';
import DurationChart from './durationChart/DurationChart';
import TodayActivity from '../checkInOut/TodayActivity';

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
                bookings={recentBookings}
                cabinsCount={cabins?.length}
                confirmedStays={confirmedStays}
            />
            <TodayActivity />
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart bookings={recentBookings} numDays={numDays} />
        </StyledDashboardLayout>
    );
}
