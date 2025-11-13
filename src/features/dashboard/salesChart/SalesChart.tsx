import {
    Area,
    XAxis,
    YAxis,
    Tooltip,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import styled from 'styled-components';
import useDarkMode from '@/hooks/useDarkMode';
import { getChartData } from '@/utils/helpers';
import { darkModeColors, lightModeColors } from './dataSource';
import { type BookingsAfterDate } from '@/lib/supabase/services/types/types';

import Heading from '@/ui/Heading';
import DashboardBox from '../DashboardBox';

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

    const salesFrom = format(chartData.at(0)!.label, 'MMM dd yyyy');
    const salesTo = format(chartData.at(-1)!.label, 'MMM dd yyyy');

    return (
        <StyledSalesChart>
            <Heading as="h2">
                Sales from {salesFrom} &mdash; {salesTo}
            </Heading>
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
