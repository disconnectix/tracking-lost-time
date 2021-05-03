import React from 'react';
import {Pie} from 'react-chartjs-2';

const PieChart = ({chartData}) => {

  console.log('chartData --- Pie -----------------------------------');
  console.log(chartData);

  let labels = [];
  let datasetsColor = [];
  let datasetsData = [];

  chartData.forEach( chart => {
    labels.push(chart[0]);
    datasetsColor.push(chart[1]);
    datasetsData.push(chart[2])
  })

  const data = {
    datasets: [
      {
        data: datasetsData,
        backgroundColor: datasetsColor,
        label: 'Dataset',
        hoverBorderColor: '#fff',
      },
    ],
    labels: labels,
  }

  return (
    <Pie data={data} />
  )
}

export default PieChart;
