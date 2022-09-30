import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import randomcolor from 'randomcolor';
import {useEffect, useRef} from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

export function LineChart({
    labels,
    data,
    legendLabels,
}) {
    const scales = {
        y: {
            min: -100,
            max: 100
        }
    }
    
    const options = {
        responsive: true,
        scales: scales,
        plugins: {
            limits: {
                y: {
                    min: -100,
                    max: 'original'
                }
            },
            legend: {
                position: 'top'
            },
            zoom: {
                limits: {
                    y: {
                        min: -100,
                        max: 100
                    }
                },
                pan: {
                    enabled: true,
                    mode: 'xy',
                    threshold: 5
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy'
                }
            }
        }
    };

    const labels = props.labels;

    const data = {
        labels,
        datasets: []
    };

    data.datasets = props
        .data
        .map((item, key) => {
            let color = randomcolor();
            return {
                label: props.legendLabels[key], 
                data: item, 
                borderColor: color, 
                backgroundColor: color, 
                tension: 0.4
            }
        })

    const ref = useRef < any > (null);
    
    return <Line ref={ref} options={options} data={data} height={220} />;
}
