import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import randomColor from 'randomcolor';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function AreaChart({
    history
}) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: '',
            },
        },
    };

    console.log("history ",history)

    const labels = history.map(registry => {
        return registry.date
    });

    const color = randomColor();

    const data = {
        labels,
        datasets: [
            {
            fill: true,
            label: 'Umidade em %',
            data: history.map(registry => {
                return registry.humidity
            }),
            borderColor: color,
            backgroundColor: color,
            },
        ],
    };
    
    return <Line options={options} data={data} />;
}
