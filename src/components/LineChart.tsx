import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


interface Props {
  data: number[];
  labels: string[];
}

const LineChart: React.FC<Props> = ({ data, labels }) => {
  const chartRef = useRef<Chart>();

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart('myChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'My Dataset',
            data: data,
            fill: false,
            borderColor: 'blue',
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, [data, labels]);

  return <canvas id="myChart" />;
};

export default LineChart;
