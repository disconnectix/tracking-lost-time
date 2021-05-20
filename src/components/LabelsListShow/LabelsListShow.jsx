import React, {useState} from 'react';
import './LabelsListShow.scss';
import {Button} from 'primereact/button';

const LabelsListShow = ({chartData}) => {
  const [showLabels, setShowLabels] = useState(false);

  const labels = chartData.map((chart) =>
    <li
      key={chart[0].toString()}
      className='labels__item'
    >
      <span className='labels__color' style={{backgroundColor: chart[1]}}/>
      <span className='labels__title'>{chart[0]}</span>
    </li>
  );

  const showLabelsHandler = () => setShowLabels(!showLabels)

  return (
    <>
      { showLabels &&
        <ul className='labels'>
          {labels}
        </ul>
      }
      <Button
        className='p-button-lg labels__button'
        label='Labels'
        icon='pi pi-sort-alt'
        onClick={showLabelsHandler}
      />
    </>
);
}

export default LabelsListShow;
