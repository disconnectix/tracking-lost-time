import React from 'react';
import './DataIsEmpty.scss';

const DataIsEmpty = ({header, message}) => {
  // console.log(header);
  // console.log(message);
  return (
    <div className='dataIsEmpty'>
      <h2 className='dataIsEmpty__header'>{header.toString()}</h2>
      <p className='dataIsEmpty__message'>{message.toString()}</p>
    </div>
  );
}

export default DataIsEmpty;
