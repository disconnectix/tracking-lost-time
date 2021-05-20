import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import LabelsListShow from '../LabelsListShow/LabelsListShow.jsx';

const DoughnutChart = ({chartData}) => {

  console.log('chartData --- Doughnut -----------------------------------');
  console.log(chartData);

  // let labels = [];
  let datasetsColor = [];
  let datasetsData = [];

  chartData.forEach( chart => {
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
    labels: [],
  }

  return (
    <>
      <Doughnut data={data} />
      <LabelsListShow chartData={chartData}/>
    </>
)
}

export default DoughnutChart;
