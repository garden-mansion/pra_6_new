import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Container from '@mui/material/Container';
import type { tGroup } from "../groupdata";
import SettingChart from './SettingChart';
import { useState } from 'react';

type tSeries = {
    'Максимальная высота': boolean;
    'Средняя высота': boolean;
    'Минимальная высота': boolean;
};

type GroupChartProps = {
    data: tGroup;
};

function GroupChart({ data }: GroupChartProps) {
    const [series, setSeries] = useState<tSeries>({
        'Максимальная высота': true,
        'Средняя высота': false,
        'Минимальная высота': false,
    });

    const [isBar, setIsBar] = useState(true);

    const seriesY = Object.entries(series)
        .filter(item => item[1] === true)
        .map(item => {
            return { dataKey: item[0], label: item[0] };
        });

    const showBarLabel = isBar && seriesY.length === 1;

    const chartSeries = seriesY.map(s => ({
        ...s,
        valueFormatter: (v: number | null) => v !== null ? `${v} м` : '',
    }));

    const chartSetting = {
        yAxis: [{ label: 'Высота (м)' }],
        height: 400,
    };

    return (
        <Container maxWidth="lg">
            <SettingChart series={series} setSeries={setSeries} isBar={isBar} setIsBar={setIsBar} />
            {isBar ? (
                <BarChart
                    dataset={data}
                    xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                    series={
                        showBarLabel
                            ? chartSeries.map(s => ({
                                  ...s,
                                  barLabel: (v) => {
                                    return v !== null ? `${v.value}` : ''
                                  },
                              }))
                            : chartSeries
                    }
                    slotProps={{
                        legend: {
                            position: { vertical: 'bottom', horizontal: 'center' },
                        },
                    }}
                    {...chartSetting}
                />
            ) : (
                <LineChart
                    dataset={data}
                    xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                    series={chartSeries}
                    slotProps={{
                        legend: {
                            position: { vertical: 'bottom', horizontal: 'center' },
                        },
                    }}
                    {...chartSetting}
                />
            )}
        </Container>
    );
}

export default GroupChart;
