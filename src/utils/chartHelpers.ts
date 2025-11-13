import { type StaysAfterDate } from '@/lib/supabase/services/types/types';
import { type StartDataPieChart } from '@/features/dashboard/durationChart/dataSource';

function increaseStartDataValue(
    startData?: StartDataPieChart,
    numNights?: string
) {
    return startData?.map((data) => {
        const { duration, value } = data;

        const dataWithIncreasedValue = {
            ...data,
            value: value + 1,
        };

        return duration === numNights ? dataWithIncreasedValue : data;
    });
}

export function preparePieChartData(
    startData?: StartDataPieChart,
    stays?: StaysAfterDate[]
) {
    const pieChartData = stays
        ?.reduce((acc, cur) => {
            const num = cur.numNights!;

            switch (true) {
                case num === 1: {
                    return increaseStartDataValue(acc, '1 night');
                }
                case num === 2: {
                    return increaseStartDataValue(acc, '2 nights');
                }
                case num === 3: {
                    return increaseStartDataValue(acc, '3 nights');
                }
                case [4, 5].includes(num): {
                    return increaseStartDataValue(acc, '4-5 nights');
                }
                case [6, 7].includes(num): {
                    return increaseStartDataValue(acc, '6-7 nights');
                }
                case num >= 8 && num <= 14: {
                    return increaseStartDataValue(acc, '8-14 nights');
                }
                case num >= 15 && num <= 21: {
                    return increaseStartDataValue(acc, '15-21 nights');
                }
                case num >= 21: {
                    return increaseStartDataValue(acc, '21+ nights');
                }
                default: {
                    return acc;
                }
            }
        }, startData)
        ?.filter((data) => data.value > 0);

    return pieChartData;
}
