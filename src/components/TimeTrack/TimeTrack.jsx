import React, {useEffect, useState} from 'react';
import './TimeTrack.scss';
import Loader from '../Loader';
import Error from '../Error';
import {Button} from 'primereact/button';
import {Calendar} from 'primereact/calendar';
import {request, formatDate, formatDateRevers} from '../../utils/utils';
import WorkSelect from '../WorkSelect';

const TimeTrack = () => {
  console.log('render TimeTrack...');

  const today = new Date();
  const [timetrackDate, setTimetrackDate] = useState(today);
  const [timetrack, setTimetrack] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [worksFrontend, setWorksFrontend] = useState([]);
  const [changedTimetrack, setChangedTimetrack] = useState([]);

  let minDate = new Date(2021, 2, 30);
  // minDate.setMonth(prevMonth);
  // minDate.setFullYear(prevYear);

  let maxDate = new Date();
  // maxDate.setMonth(nextMonth);
  // maxDate.setFullYear(nextYear);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // запрос к серверу
        const serverResponse = await request(`/api/works`);
        //ответ от сервера
        console.log('serverResponse --> ');
        console.log(serverResponse);

        // если response - это массив, значит пришли ожидаемые данные
        if (Array.isArray(serverResponse)) {
          setWorksFrontend(serverResponse);
        } else {
          // если response - это объект, значит пришла ошибка
          setErrorMessage(JSON.stringify(serverResponse.error));
        }
      } catch (error) {
        setErrorMessage(`TimeTrack --> useEffect --> ${error}`);
      }
      setIsLoading(false);
    };

    fetchData().then( _ => _ );
  }, []);

  const getTimetrackHandler = () => {
    console.log('...click getTimetrackHandler');
    console.log(timetrackDate);

    const currentDate = timetrackDate;
    const timetrackDateY = currentDate.getFullYear().toString();
    let month = currentDate.getMonth() + 1;
    let timetrackDateM = month < 10 ? '0' + month : '' + month;
    let day = currentDate.getDate();
    let timetrackDateD = day < 10 ? '0' + day : '' + day;
    const date = timetrackDateY + timetrackDateM + timetrackDateD;

    const fetchPostWithDate = async () => {
      try {
        setIsLoading(true);

        let serverResponse = await request(
          `/api/timetrack/${date}`
          //,
          // 'POST',
          // {
          //   date: date,
          // }
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

            let modifiedTimetrack = [];


            const idResponse = serverResponse.id;
            console.log('idResponse');
            console.log(idResponse);
            const dateResponse = serverResponse.date;
            console.log('dateResponse');
            console.log(dateResponse);

            delete serverResponse.id;
            delete serverResponse.date;

            // let _obj = {}
            // for (let prop in serverResponse) {
            //   if (prop !== 'id' && prop !== 'date') {
            //     _obj[`${prop}`] = serverResponse[`${prop}`];
            //   }
            // }
            //
            // console.log('_obj --> ');
            // console.log(_obj);
            //
            // serverResponse = {..._obj}

            let arrServerResponse = Object.entries(serverResponse);
            console.log('arrServerResponse');
            console.log(Object.entries(serverResponse));

            // let removed = arrServerResponse.splice(0, 2);
            // console.log('removed');
            // console.log(removed);

            // const idResponse = removed[0][1];
            // console.log('idResponse');
            // console.log(idResponse);
            // const dateResponse = removed[1][1];
            // console.log('dateResponse');
            // console.log(dateResponse);


            //TODO :::
            //...:2021-04-06:: "перегнать" arrServerResponse в новый массив объектов
            //... { date : '04.01.2021', time : '00 : 00', work : 'coding', bgColor: '#000000'}

            for (let i = 0; i < 24; i++) {
              let removed = arrServerResponse.splice(0, 2);
              let _obj = {};
              _obj.date = formatDate(dateResponse);
              _obj.time = `${(removed[0][0]).slice(0, 2)} : 00`;
              _obj.work = `${removed[0][1]}`;
              _obj.bgColor = `${removed[1][1]}`;
              modifiedTimetrack.push(_obj);
            }
            console.log(modifiedTimetrack);

//****************************************************************************************************************
            setTimetrack(modifiedTimetrack);
            console.log('modifiedTimetrack --> timetrack  ==>');
            console.log(modifiedTimetrack);

            setChangedTimetrack(JSON.parse(JSON.stringify(modifiedTimetrack)));
            console.log('changedTimetrack --> timetrack  ==>');
            console.log(changedTimetrack);
            console.log(modifiedTimetrack === changedTimetrack);
            console.log(modifiedTimetrack[0] === changedTimetrack[0]);
            console.log(JSON.stringify(modifiedTimetrack[0]) === JSON.stringify(changedTimetrack[0]));

            console.log('Object.entries(serverResponse)   ==>');
            console.log(Object.entries(serverResponse));
            console.log('timetrack                        ==>');
            console.log(timetrack);
//****************************************************************************************************************
          }

        setIsLoading(false);

      } catch (error) {
        setErrorMessage(`TimeTrack --> getDataHandler --> (catch) --> ${error}`);
      }
      // setIsLoading(false);
    };

    fetchPostWithDate().then( _ => _ );

  }

  const updateTimetrackHandler = () => {
    console.log('...click updateTimetrackHandler');
    console.log('changedTimetrack --> timetrack  ==>');
    console.log(changedTimetrack);
    console.log('timetrack                        ==>');
    console.log(timetrack);

    let allChanges = {};
    let date = formatDateRevers(changedTimetrack[0].date);

    for (let i = 0; i < timetrack.length; i++) {
      if (JSON.stringify(timetrack[i]) !== JSON.stringify(changedTimetrack[i])) {
        console.log(`timetrack[${i}]`);
        console.log(timetrack[i]);
        console.log(`changedTimetrack[${i}]`);
        console.log(changedTimetrack[i]);

        allChanges[`${changedTimetrack[i].time.slice(0, 2)}work`] = changedTimetrack[i].work;
        allChanges[`${changedTimetrack[i].time.slice(0, 2)}color`] = changedTimetrack[i].bgColor;

      }
    }

    console.log('allChanges --------------             ---------------');
    console.log(allChanges);

    const fetchUpdateWithDate = async () => {
      try {
        console.log('date++++++++++++++++++');
        console.log(date);
        console.log('allChanges++++++++++++++++++++');
        console.log(allChanges);

        // запрос к серверу
        const serverResponse = await request(
          `/api/timetrack/${date}`,
          'POST',
          // 'UPDATE'
          {
            ...allChanges
          }
        );

        //ответ от сервера
        console.log('serverResponse -- /api/timetrack/${date} --> ');
        console.log(serverResponse);

        if (!serverResponse) {
          throw Error({message: 'Ответ сервера пуст!'})
        }
      } catch (error) {
        setErrorMessage(`TimeTrack --> fetchUpdateWithDate --> (catch) --> ${error}`);
      }
    };

    //TODO :::
    //...Если allChanges пустой, то выполнять update НЕ нужно!
    //...проверить объект
    //...на основе проверки объекта можно сделать доступность кнопки апдейта

    if (Object.keys(allChanges).length !== 0) {
      fetchUpdateWithDate().then( _ => _ );
    }

  }

  const onChangeHandler = (e) => {
    setTimetrackDate(e.target.value);
    console.log(e.target.value);
  }

  //************************************************************** TEST TEST TEST
  //TODO :::
  //TODO 1 -- получить данные из дочернего компонента WorkSelect
  //TODO 2 -- обработать данные : из time получить индекс массива changedTimetrack
  //TODO 3 -- занести данные в массив по полученному индексу
  //TODO 4 -- протестировать

  const getCurrentWork = (changedWork) => {

    const {work, bgColor, time} = changedWork;

    console.log(`work : ${work}`);
    console.log(`bgColor : ${bgColor}`);
    console.log(`time : ${time}`);

    const indexTimetrack = +time.slice(0, 2);
    console.log('indexTimetrack === ');
    console.log(indexTimetrack);

    console.log('changedTimetrack === ');
    console.log(changedTimetrack);
    console.log('changedTimetrack[indexTimetrack] === ');
    console.log(changedTimetrack[indexTimetrack]);


    let _tempArr = [...changedTimetrack];
    _tempArr[indexTimetrack] = {...changedTimetrack[indexTimetrack], work, bgColor};
    setChangedTimetrack(_tempArr);


    console.log('_tempArr[indexTimetrack]  === ');
    console.log(_tempArr[indexTimetrack]);
    console.log('changedTimetrack[indexTimetrack] updated === ');
    console.log(changedTimetrack[indexTimetrack]);


  }
  //************************************************************** TEST TEST TEST

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

      <div className='timetrack__buttons'>
        <Button
          className='p-button-lg timetrack__button timetrack__button--get'
          label='Get timetrack'
          icon='pi pi-cloud-download'
          onClick={getTimetrackHandler}
        />

        <Button
          className='p-button-lg p-button-danger timetrack__button timetrack__button__update'
          label='Update timetrack'
          icon='pi pi-save'
          onClick={updateTimetrackHandler}
          disabled={false}
        />
      </div>

      { isLoading && <Loader/> }
      { errorMessage && <Error message={errorMessage}/> }

      { !isLoading && !errorMessage &&
        <ul className='timetrack__works'>
          {
            timetrack.map(objectWork =>
              <li className='timetrack__work item' key={objectWork.time}>
                <div className='item__datetime'>
                  <span className='item__date'>{objectWork.date}</span>
                  <span className='item__time'>{objectWork.time}</span>
                </div>
                <div className='item__workwrap'>
                  <WorkSelect
                    optionsList={worksFrontend}
                    currentWork={objectWork}
                    getCurrentWork={getCurrentWork}
                  />
                </div>
              </li>
            )
          }
        </ul>
      }

    </section>
  )
}

export default TimeTrack;

/**
 *
 *
 *
 *
 *
 *         <ul className='timetrack__works'>
 {
            timetrack.map(objectWork =>
              <li className='timetrack__work item' key={objectWork.time}>
                <div className='item__datetime'>
                  <span className='item__date'>{objectWork.date}</span>
                  <span className='item__time'>{objectWork.time}</span>
                </div>
                <div className='item__workwrap'>
                  <span className='item__work' style={{backgroundColor: `${objectWork.color}`}}>{objectWork.work}</span>
                </div>
              </li>
            )
          }
 </ul>

 *
 *
 *
 *
 *      <div>
 This is dynamic select element demo
 <div>
 <span>Select user</span> :
 {worksFrontend && worksFrontend.length > 0 && (
            <div>
              <select onChange={(e) => {console.log(e.target.value)}}>
                {worksFrontend.map(w => {
                  return <option key={w.work} style={{backgroundColor: w.bgColor}}>{w.work}</option>;
                })}
              </select>
            </div>
          )}
 </div>
 </div>

 *
 *
 *
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
