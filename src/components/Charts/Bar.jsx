import React from 'react';
import {Bar} from 'react-chartjs-2';
import LabelsListShow from '../LabelsListShow/LabelsListShow.jsx';

const BarChart = ({chartData}) => {

  console.log('chartData --- Bar -----------------------------------');
  console.log(chartData);

  let labels = [];
  let datasetsColor = [];
  let datasetsData = [];

  chartData.forEach( (chart, index) => {
    labels.push(index + 1);
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
    <>
      <Bar
        data={data}
        options={options}
      />
      <LabelsListShow chartData={chartData}/>
    </>
)
}

export default BarChart;
