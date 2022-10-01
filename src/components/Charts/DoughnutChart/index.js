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
            backgroundColor: customLabels.map(label => { return label.color }),
            borderColor: customLabels.map(label => { return label.color }),
            borderWidth: 1,
          },
        ],
    };

    return <Doughnut data={data} />
}
