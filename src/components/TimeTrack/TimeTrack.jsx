import React, {useEffect, useState} from 'react';
import './TimeTrack.scss';
import { Button } from 'primereact/button';

const TimeTrack = () => {
  console.log('render TimeTrack...');

  const [workDate, setWorkDate] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    console.log(currentDate);

    const workDateY = currentDate.getFullYear().toString();

    let workDateM = '';
    let month = currentDate.getMonth() + 1;
    workDateM  = month < 10 ? '0' + month : '' + month;

    let workDateD = '';
    let day = currentDate.getDate();
    workDateD  = day < 10 ? '0' + day : '' + day;

    const date = workDateY + workDateM + workDateD;

    setWorkDate(date);
    console.log(date);
    console.log(typeof date);

  }, []);

  return (
    <section className='timetrack'>
      <p>TimeTrack</p>
      <h3>Текущая дата : {workDate}</h3>
    </section>
  )
}

export default TimeTrack;

/**
 * import React, {useEffect, useState} from 'react';
 import './Workload.scss';

 const Workload = () => {
  console.log('render Workload...');

  const [workDate, setWorkDate] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    console.log(currentDate);

    const workDateY = currentDate.getFullYear().toString();

    let workDateM = '';
    let month = currentDate.getMonth() + 1;
    workDateM  = month < 10 ? '0' + month : '' + month;

    let workDateD = '';
    let day = currentDate.getDate();
    workDateD  = day < 10 ? '0' + day : '' + day;

    setWorkDate(+(workDateY + workDateM + workDateD));
    console.log(+(workDateY + workDateM + workDateD));
    console.log(typeof +(workDateY + workDateM + workDateD));

  }, [setWorkDate]);


  return (
    <section className='workload'>
      <h1>Workload</h1>
      <h3>Текущая дата : {workDate}</h3>
    </section>
  )
}

 export default Workload;
 * */
