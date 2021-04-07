import React from 'react';
import './TimeTrackItem.scss';

const TimeTrackItem = ({objectWork}) => {

  return (
    <>
      <div className='item__datetime'>
        <span className='item__date'>{objectWork.date}</span>
        <span className='item__time'>{objectWork.time}</span>
      </div>
      <div className='item__workwrap'>
        <span className='item__work' style={{backgroundColor: `${objectWork.color}`}}>{objectWork.work}</span>
      </div>
    </>
  )
}

export default TimeTrackItem;
