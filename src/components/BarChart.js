import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ labels, data_1, data_2 }) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Question-2',
                data: data_1,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: ['rgba(255, 99, 132, 1)'],
                borderWidth: 1
            },
            {
              label: 'Question-4',
              data: data_2,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }
        ],
    };

    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 6
              },
            },
          ],
        },
      };

    return (
        <>
            <Bar
                data={data}
                width={100}
                height={50}
                // options={{ maintainAspectRatio: true }}
                options={options}
            />
        </>
    )
}

export default BarChart;
