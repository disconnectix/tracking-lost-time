import React from 'react';
import { Polar } from 'react-chartjs-2';
import LabelsListShow from '../LabelsListShow/LabelsListShow.jsx';
import './PolarArea.scss';

const PolarArea = ({chartData}) => {

  console.log('chartData --- PolarArea -----------------------------------');
  console.log(chartData);

  // let labels = [];
  let datasetsColor = [];
  let datasetsData = [];

  // 0: (3) ["111111", "#ff0000", 6]
  // 1: (3) ["222222", "#00ff00", 6]
  // 2: (3) ["333333", "#0000ff", 6]
  // 3: (3) ["444444", "#ffff00", 6]

  chartData.forEach( chart => {
    datasetsColor.push(chart[1]);
    datasetsData.push(chart[2])
  })

  // let labels = ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'];
  // let datasetsData = [1, 2, 1, 3, 1];
  // let datasetsColor = ['#f46a6a', '#34c38f', '#f1b44c', '#ff6ee6', '#ff00ff'];

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
      <Polar data={data} />
      <LabelsListShow chartData={chartData}/>
    </>
  )
}

export default PolarArea;
