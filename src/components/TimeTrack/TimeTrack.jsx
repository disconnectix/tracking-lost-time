import React, {useEffect, useState} from 'react';
import './TimeTrack.scss';
import { Button } from 'primereact/button';
import {request} from '../../utils/utils';

const TimeTrack = () => {
  console.log('render TimeTrack...');

  const [timetrackDate, setTimetrackDate] = useState('');
  const [timetrack, setTimetrack] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    console.log(currentDate);

    const timetrackDateY = currentDate.getFullYear().toString();

    let timetrackDateM = '';
    let month = currentDate.getMonth() + 1;
    timetrackDateM  = month < 10 ? '0' + month : '' + month;

    let timetrackDateD = '';
    let day = currentDate.getDate();
    timetrackDateD  = day < 10 ? '0' + day : '' + day;



    // const date = timetrackDateY + timetrackDateM + timetrackDateD;
    const date = '20210402';



    setTimetrackDate(date);
    console.log(date);
    console.log(typeof date);

  }, []);

  const getDataHandler = () => {
    console.log('...click getDataHandler');

    const fetchPostWithDate = async () => {
      try {


        const serverResponse = await request(
          `/api/timetrack`,
          'POST',
          {
            date: timetrackDate,
          }
        );




        //ответ от сервера
        console.log('serverResponse --> ');
        console.log(serverResponse);

//TODO ::: ***************************************************************************************************
        //TODO :::


        setTimetrack(Object.entries(serverResponse));

        console.log('Object.entries(serverResponse)             ==>');
        console.log(Object.entries(serverResponse));
        console.log('timetrack                                  ==>');
        console.log(timetrack);

      //   // если response - это массив, значит пришли ожидаемые данные
      //   if (Array.isArray(serverResponse)) {
      //     setWorksFrontend(serverResponse);
      //   } else {
      //     // если response - это объект, значит пришла ошибка
      //     setErrorMessage(JSON.stringify(serverResponse.error));
      //   }
      } catch (error) {
        // setErrorMessage(`Works --> useEffect --> ${error}`);
      }
      // setIsLoading(false);
    };

    fetchPostWithDate().then( _ => _ );

  }

  return (
    <section className='timetrack'>
      <p>TimeTrack</p>
      <h3>Текущая дата : {timetrackDate}</h3>

      <Button
        label='Get data'
        icon='pi pi-check'
        className='p-button-lg'
        onClick={getDataHandler}
      />


      //TODO ::: ul перенести в отдельный компонент или функцию

      <ul>
        {
          timetrack.map((elem) =>
            <li key={elem[0]}>
              <span>{elem[0]}</span>
              <span> : </span>
              <span>{elem[1]}</span>
            </li>
          )
        }
      </ul>

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
