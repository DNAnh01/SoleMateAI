import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import { defaultTheme } from '~/styles/themes/default';
import { DashboardContext } from '~/contexts/dashboard.context';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const FullWidthSection = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ChartStatsSection = () => {
    const { chartStatsByFilter } = useContext(DashboardContext);
    const chartData = chartStatsByFilter;
    const labels = chartData.map((item) => item.time_point);
    const revenueValues = chartData.map((item) => item.revenue_cost);
    const profitValues = chartData.map((item) => item.profit_cost);
    const warehouseValues = chartData.map((item) => item.warehouse_cost);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Doanh thu',
                data: revenueValues,
                backgroundColor: defaultTheme.color_blue,
                borderColor: defaultTheme.color_blue,
                pointBorderColor: defaultTheme.color_blue,
                pointBorderWidth: 4,
                tension: 0.4,
            },
            {
                label: 'Lợi nhuận',
                data: profitValues,
                backgroundColor: defaultTheme.color_yellow_green,
                borderColor: defaultTheme.color_yellow_green,
                pointBorderColor: defaultTheme.color_yellow_green,
                pointBorderWidth: 4,
                tension: 0.4,
            },
            {
                label: 'Chi phí kho',
                data: warehouseValues,
                backgroundColor: defaultTheme.color_yellow,
                borderColor: defaultTheme.color_yellow,
                pointBorderColor: defaultTheme.color_yellow,
                pointBorderWidth: 4,
                tension: 0.4,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: Math.max(...revenueValues, ...profitValues, ...warehouseValues) + 5000000,
                ticks: {
                    callback: function (value) {
                        return new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(value);
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(context.parsed.y);
                        }
                        return label;
                    },
                },
            },
        },
    };

    return (
        <FullWidthSection>
            <Line data={data} options={options} />
        </FullWidthSection>
    );
};

export default ChartStatsSection;
