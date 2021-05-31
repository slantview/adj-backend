import React from 'react';
import Chart from 'react-apexcharts';
import Card from 'components/UI/Card';

const UsersGraph = () => {
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
        colors: ['#10B981', '#EF4444'],
        fill: {
            opacity: 0.85,
            colors: ['#10B981', '#EF4444']
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
            name: 'Active',
            data: [1, 2, 4, 8, 10, 15, 20]
        },
        {
            name: 'Suspended',
            data: [0, 0, 0, 0, 0, 0, 0]
        }
    ];

    return (
        <Card title="Users">
            <Chart
                options={chartDashboardStatistics2BOptions}
                series={chartDashboardStatistics2BData}
                type="bar"
                height={200}
            />
        </Card>
    );
}

export default UsersGraph;