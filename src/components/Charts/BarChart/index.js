import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import randomColor from 'randomcolor'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({
    history
}) {

    // const [customLabels, setCustomLabels] = useState([])

    // const updateDatasets = () => {
    //     let labels = [];
    //     history.map(registry => {
    //         console.log(registry)
    //         if(labels.find(label => label.title == registry.weather)){
    //             labels.find(label => label.title == registry.weather).count += 1;
    //         } else {
    //             labels.push({
    //                 title: registry.weather,
    //                 count: 1,
    //                 color: randomColor()
    //             })
    //         }
    //     })
    //     setCustomLabels(labels)
    // }

    // useEffect(() => {
    //     updateDatasets()
    // }, [history])

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

    const labels = history.length > 0 ? history.map(registry => registry.date) : ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Temperatura em C°',
                data: history.length > 0 ? history.map(registry => registry.temperature) : [1,2,3,4,5,6],
                backgroundColor: randomColor(),
            },
            {
                label: 'Sensação Térmica em C°',
                data: history.length > 0 ? history.map(registry => registry.sensation) : [1,2,3,4,5,6],
                backgroundColor: randomColor(),
            }            
        ],
    };

  return <Bar options={options} data={data} />;
}
