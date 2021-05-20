import React from 'react';
import {Pie} from 'react-chartjs-2';
import LabelsListShow from '../LabelsListShow/LabelsListShow.jsx';

const PieChart = ({chartData}) => {

  console.log('chartData --- Pie -----------------------------------');
  console.log(chartData);

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
      <Pie data={data} />
      <LabelsListShow chartData={chartData}/>
    </>
)
}

export default PieChart;
