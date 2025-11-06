import {
    Area,
    XAxis,
    YAxis,
    Tooltip,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import useDarkMode from '@/hooks/useDarkMode';
import { darkModeColors, lightModeColors } from './dataSource';
import { type BookingsAfterDate } from '@/lib/supabase/services/bookings.service';

import Heading from '@/ui/Heading';
import DashboardBox from '../DashboardBox';
import { getChartData } from '@/utils/helpers';

type SalesChartProps = {
    numDays: number;
    bookings?: BookingsAfterDate;
};

const StyledSalesChart = styled(DashboardBox)`
    grid-column: 1 / -1;

    & .recharts-cartesian-grid-horizontal line,
    & .recharts-cartesian-grid-vertical line {
        stroke: var(--color-grey-300);
    }
`;

export default function SalesChart({ bookings, numDays }: SalesChartProps) {
    const { isDarkMode } = useDarkMode();

    const colors = isDarkMode ? darkModeColors : lightModeColors;
    const { totalSales, extrasSales, text, background } = colors;

    const chartData = getChartData(numDays, bookings);

    return (
        <StyledSalesChart>
            <Heading as="h2">Sales</Heading>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                    <YAxis
                        unit="$"
                        tick={{ fill: text }}
                        tickLine={{ stroke: text }}
                    />
                    <XAxis
                        dataKey="label"
                        tick={{ fill: text }}
                        tickLine={{ stroke: text }}
                    />
                    <Area
                        unit="$"
                        strokeWidth="2"
                        type="monotone"
                        name="Total sales"
                        dataKey="totalSales"
                        fill={totalSales.fill}
                        stroke={totalSales.stroke}
                    />
                    <Area
                        unit="$"
                        strokeWidth="2"
                        type="monotone"
                        name="Extras sales"
                        dataKey="extrasSales"
                        fill={extrasSales.fill}
                        stroke={extrasSales.stroke}
                    />
                    <CartesianGrid strokeDasharray="4" />
                    <Tooltip contentStyle={{ backgroundColor: background }} />
                </AreaChart>
            </ResponsiveContainer>
        </StyledSalesChart>
    );
}
