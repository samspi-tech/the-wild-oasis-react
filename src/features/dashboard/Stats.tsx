import {
    type StaysAfterDate,
    type BookingsAfterDate,
} from '@/lib/supabase/services/bookings.service';
import {
    HiOutlineBanknotes,
    HiOutlineChartBar,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
} from 'react-icons/hi2';
import SingleStat from './SingleStat';
import { formatCurrency } from '@/utils/helpers';

type StatsProps = {
    numDays: number;
    cabinsCount?: number;
    bookings?: BookingsAfterDate;
    confirmedStays?: StaysAfterDate[];
};

export default function Stats({
    numDays,
    bookings,
    cabinsCount,
    confirmedStays,
}: StatsProps) {
    const numBookings = bookings?.length;

    const totalSales = bookings?.reduce((acc, cur) => {
        return acc + cur.totalPrice!;
    }, 0);

    const totalCheckIns = confirmedStays?.length;

    const numNights = confirmedStays?.reduce((acc, cur) => {
        return acc + cur.numNights!;
    }, 0);

    const occupationRate = Math.round(
        (numNights! / (numDays * cabinsCount!)) * 100
    );

    return (
        <>
            <SingleStat
                color="blue"
                title="Bookings"
                value={numBookings}
                icon={<HiOutlineBriefcase />}
            />
            <SingleStat
                color="green"
                title="Sales"
                value={formatCurrency(totalSales!)}
                icon={<HiOutlineBanknotes />}
            />
            <SingleStat
                color="indigo"
                title="Check ins"
                value={totalCheckIns}
                icon={<HiOutlineCalendarDays />}
            />
            <SingleStat
                color="yellow"
                title="Occupancy rate"
                value={`${occupationRate}%`}
                icon={<HiOutlineChartBar />}
            />
        </>
    );
}
