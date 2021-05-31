import React from 'react';
import Chart from 'react-apexcharts';
import Card from 'components/UI/Card';

const SitesGraph = () => {
    const chartDashboardStatistics2BOptions = {
        chart: {
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors: ['#EF4444', '#FBBF24', '#10B981'],
        fill: {
            opacity: 0.85,
            colors: ['#EF4444', '#FBBF24', '#10B981']
        },
        grid: {
            strokeDashArray: '5',
            borderColor: 'rgba(125, 138, 156, 0.3)'
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        legend: {
            show: true
        },
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    };
    const chartDashboardStatistics2BData = [
        {
            name: 'Disabled',
            data: [0, 0, 0, 1, 1, 1, 0]
        },
        {
            name: 'Pre-Live',
            data: [0, 0, 0, 1, 2, 1, 0]
        },
        {
            name: 'Live',
            data: [1, 2, 4, 8, 10, 15, 20]
        }
    ];

    return (
        <Card title="Sites">
            <Chart
                options={chartDashboardStatistics2BOptions}
                series={chartDashboardStatistics2BData}
                type="bar"
                height={200}
            />
        </Card>
    );
}

export default SitesGraph;