import React from 'react';
import './Error.scss';

const Error = ({message}) => {
  console.log('Error -- Error -- message');
  console.log(message);
  return (
    <section className='error'>
      <h2 className='error__header'>Error</h2>
      <p className='error__message'>{message.toString()}</p>
    </section>
  );
}

export default Error;
