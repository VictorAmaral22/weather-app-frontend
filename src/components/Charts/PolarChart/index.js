import React, {useState, useEffect} from 'react';
import {Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend} from 'chart.js';
import {PolarArea} from 'react-chartjs-2';
import randomColor from 'randomcolor'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function PolarChart({history}) {
    const [customLabels,
        setCustomLabels] = useState([])

    const updateDatasets = () => {
        let labels = [];
        history.map(registry => {
            console.log(registry)
            if (labels.find(label => label.title == registry.weather)) {
                labels
                    .find(label => label.title == registry.weather)
                    .count += 1;
            } else {
                labels.push({title: registry.weather, count: 1, color: randomColor()})
            }
        })
        setCustomLabels(labels)
    }

    useEffect(() => {
        updateDatasets()
    }, [history])

    const data = {
        labels: customLabels.map(label => {
            return label.title
        }),
        datasets: [
            {
                label: '# of Votes',
                data: customLabels.map(label => {
                    return label.count
                }),
                backgroundColor: customLabels.map(label => {
                    return label.color
                }),
                borderColor: customLabels.map(label => {
                    return label.color
                }),
                borderWidth: 1
            }
        ]
    };

    return <PolarArea data={data}/>;
}
