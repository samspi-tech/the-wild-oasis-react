import {
    Pie,
    Cell,
    Legend,
    Tooltip,
    PieChart,
    ResponsiveContainer,
} from 'recharts';
import Heading from '@/ui/Heading';
import styled from 'styled-components';
import useDarkMode from '@/hooks/useDarkMode';
import { preparePieChartData } from '@/utils/chartHelpers';
import { startDataDarkTheme, startDataLightTheme } from './dataSource';
import { type StaysAfterDate } from '@/lib/supabase/services/types/types';

type DurationChartProps = {
    confirmedStays?: StaysAfterDate[];
};

const ChartBox = styled.div`
    padding: 2.4rem 3.2rem;
    grid-column: 3 / span 2;
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-md);
    border: 1px solid var(--color-grey-100);

    & > *:first-child {
        margin-bottom: 1.6rem;
    }

    & .recharts-pie-label-text {
        font-weight: 600;
    }
`;

export default function DurationChart({ confirmedStays }: DurationChartProps) {
    const { isDarkMode } = useDarkMode();

    const startData = isDarkMode ? startDataDarkTheme : startDataLightTheme;

    const pieData = preparePieChartData(startData, confirmedStays);

    return (
        <ChartBox>
            <Heading as="h2">Stay duration summury</Heading>
            <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                    <Pie
                        cx="40%"
                        cy="50%"
                        data={pieData}
                        dataKey="value"
                        paddingAngle={3}
                        innerRadius={85}
                        outerRadius={110}
                        nameKey="duration"
                    >
                        {pieData?.map((entry) => {
                            const { duration, color } = entry;

                            return (
                                <Cell
                                    fill={color}
                                    stroke={color}
                                    key={duration}
                                />
                            );
                        })}
                    </Pie>
                    <Tooltip />
                    <Legend
                        width={150}
                        align="right"
                        iconSize={15}
                        iconType="circle"
                        layout="vertical"
                        verticalAlign="middle"
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartBox>
    );
}
