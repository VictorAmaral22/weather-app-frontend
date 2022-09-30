import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import randomColor from 'randomcolor';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({
    history
}) {

    // console.log("history ",history)
    const [customLabels, setCustomLabels] = useState([])

    const updateDatasets = () => {
        let labels = [];
        history.map(registry => {
            console.log(registry)
            if(labels.find(label => label.title == registry.weather)){
                labels.find(label => label.title == registry.weather).count += 1;
            } else {
                labels.push({
                    title: registry.weather,
                    count: 1,
                    color: randomColor()
                })
            }
        })
        setCustomLabels(labels)
    }

    useEffect(() => {
        updateDatasets()
    }, [history])

    const data = {
        labels: customLabels.map(label => { return label.title }),
        datasets: [
          {
            label: '# of Votes',
            data: customLabels.map(label => { return label.count }),
            backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 129, 62, 1)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 129, 62, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };

    return <Doughnut data={data} />
}
