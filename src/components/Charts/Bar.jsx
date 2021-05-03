import React from 'react';
import {Bar} from 'react-chartjs-2';

const BarChart = ({chartData}) => {

  console.log('chartData --- Bar -----------------------------------');
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
        label: 'Bar',
        hoverBorderColor: '#fff',
      },
    ],
    labels: labels,
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Bar data={data} options={options}/>
  )
}

export default BarChart;
