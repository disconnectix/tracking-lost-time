import React, {useEffect, useState} from 'react';
import './TimeTrack.scss';
import Loader from '../Loader';
import Error from '../Error';
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
import {request} from '../../utils/utils';
import TimeTrackItem from '../TimeTrackItem';

const TimeTrack = () => {
  console.log('render TimeTrack...');

  const today = new Date();
  const [timetrackDate, setTimetrackDate] = useState(today);
  const [timetrack, setTimetrack] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  // let month = today.getMonth();
  // let year = today.getFullYear();
  // let prevMonth = (month === 0) ? 11 : month - 1;
  // let prevYear = (prevMonth === 11) ? year - 1 : year;
  // let nextMonth = (month === 11) ? 0 : month + 1;
  // let nextYear = (nextMonth === 0) ? year + 1 : year;


  let minDate = new Date(2021, 2, 30);
  // minDate.setMonth(prevMonth);
  // minDate.setFullYear(prevYear);

  let maxDate = new Date();
  // maxDate.setMonth(nextMonth);
  // maxDate.setFullYear(nextYear);


  useEffect(() => {
    // // setTimetrackDate(new Date());
    // const currentDate = new Date();
    // console.log(currentDate);
    //
    // const timetrackDateY = currentDate.getFullYear().toString();
    //
    // let timetrackDateM = '';
    // let month = currentDate.getMonth() + 1;
    // timetrackDateM = month < 10 ? '0' + month : '' + month;
    //
    // let timetrackDateD = '';
    // let day = currentDate.getDate();
    // timetrackDateD = day < 10 ? '0' + day : '' + day;
    //
    //
    //
    // // const date = timetrackDateY + timetrackDateM + timetrackDateD;
    // const date = '20210401';
    //
    //
    //
    // setTimetrackDate(date);
    // console.log(date);
    // console.log(typeof date);

  }, []);

  const getDataHandler = () => {
    console.log('...click getDataHandler');
    console.log(timetrackDate);

    const currentDate = timetrackDate;
    const timetrackDateY = currentDate.getFullYear().toString();
    let timetrackDateM = '';
    let month = currentDate.getMonth() + 1;
    timetrackDateM = month < 10 ? '0' + month : '' + month;
    let timetrackDateD = '';
    let day = currentDate.getDate();
    timetrackDateD = day < 10 ? '0' + day : '' + day;
    const date = timetrackDateY + timetrackDateM + timetrackDateD;


    const fetchPostWithDate = async () => {
      try {
        setIsLoading(true);

        const serverResponse = await request(
          `/api/timetrack`,
          'POST',
          {
            date: date,
          }
        );

        //ответ от сервера
        console.log('serverResponse --> ');
        console.log(serverResponse);

//TODO :::
//1) определить, что с бека пришел объект с ошибкой
//2) отобразить ошибку в компоненте <Error/>

/**
 *
 * res.status(500).json({
            date,
            message: `*** ERROR-500 --> getTimetrackDateBackend (try) : ${err}`,
            error: true,
          })
 * */

          if (serverResponse.error) {
            setErrorMessage(serverResponse.message);
          } else {

            let result = [];
            let arrServerResponse = Object.entries(serverResponse);

            let removed = arrServerResponse.splice(0, 2);

            const idResponse = removed[0][1];
            console.log('idResponse');
            console.log(idResponse);
            const dateResponse = removed[1][1];
            console.log('dateResponse');
            console.log(dateResponse);

            //TODO :::
            //...:2021-04-06:: "перегнать" arrServerResponse в новый массив объектов
            //... { date : '04.01.2021', time : '00 : 00', work : 'coding', color: '#000000'}

            for (let i = 0; i < 24; i++) {
              removed = arrServerResponse.splice(0, 2);
              let _obj = {};
              _obj.date = dateResponse;
              _obj.time = `${(removed[0][0]).slice(0, 2)} : 00`;
              _obj.work = `${removed[0][1]}`;
              _obj.color = `${removed[1][1]}`;
              result.push(_obj);
            }
            console.log(result);


            // arrServerResponse = arrServerResponse.filter((elem, i) => (i !== 0) && (i !== 1));
            setTimetrack(result);

            console.log('Object.entries(serverResponse)             ==>');
            console.log(Object.entries(serverResponse));
            console.log('timetrack                                  ==>');
            console.log(timetrack);
          }

        setIsLoading(false);

      } catch (error) {
        setErrorMessage(`TimeTrack --> getDataHandler --> (catch) --> ${error}`);
      }
      // setIsLoading(false);
    };

    fetchPostWithDate().then( _ => _ );

  }

  const onChangeHandler = (e) => {
    setTimetrackDate(e.target.value);
    console.log(e.target.value);
  }

  return (
    <section className='timetrack'>
      <h3 className='timetrack__title'>Choose date please :</h3>

      <div className='p-field p-col-12 p-md-4 timetrack__date'>
        <Calendar
          id='currentDate'
          dateFormat='dd.mm.yy'
          value={timetrackDate}
          onChange={onChangeHandler}
          minDate={minDate}
          maxDate={maxDate}
          showIcon
          readOnlyInput
        />
      </div>

      <Button
        className='p-button-lg timetrack__get'
        label='Get data'
        icon='pi pi-check'
        onClick={getDataHandler}
      />

      { isLoading && <Loader/> }
      { errorMessage && <Error message={errorMessage}/> }

      <ul className='timetrack__works'>
        {
          timetrack.map(objectWork =>
            <li className='timetrack__work' key={objectWork.time}>
              <TimeTrackItem objectWork={objectWork}/>
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
