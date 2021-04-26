import React, {useState} from 'react';
import './Charts.scss';
import Loader from '../Loader';
import Error from '../Error';
import {Calendar} from 'primereact/calendar';
import PolarArea from './PolarArea';
import {convertNewDate, request} from '../../utils/utils';
import {Button} from 'primereact/button';

const Charts = () => {
  console.log('render Charts...');

  const today = new Date();
  const [dateBegin, setDateBegin] = useState(today);
  const [dateEnd, setDateEnd] = useState(today);
  const [chartsData, setChartsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [worksFrontend, setWorksFrontend] = useState([]);
  // const [changedTimetrack, setChangedTimetrack] = useState([]);

  let minDate = new Date(2021, 2, 30);
  let maxDate = new Date();





  const fetchCharts = async () => {
    try {
      console.log('dateBegin     ++++++++++++++++++');
      console.log(dateBegin);
      console.log('dateEnd       ++++++++++++++++++++');
      console.log(dateEnd);

      const convertDateBegin = convertNewDate(dateBegin);
      const convertDateEnd = convertNewDate(dateEnd);

      console.log('convertDateBegin     ++++++++++++++++++');
      console.log(convertDateBegin);
      console.log('convertDateEnd       ++++++++++++++++++++');
      console.log(convertDateEnd);

      const requestDates = {
        dateBegin : convertDateBegin,
        dateEnd : convertDateEnd
      }

      // запрос к серверу
      const serverResponse = await request(
        `/api/timetracks`,
        'POST',
        // 'UPDATE'
        {
          ...requestDates
        }
      );

      //ответ от сервера
      console.log('serverResponse -- /api/timetracks --> ');
      console.log(serverResponse);
      setChartsData(serverResponse);

      if (!serverResponse) {
        throw Error({message: 'Ответ сервера пуст!'})
      }
    } catch (error) {
      setErrorMessage(`TimeTrack --> fetchUpdateWithDate --> (catch) --> ${error}`);
    }
  };













// let _arr = [
    // {
    //   "id": 1,
    //   "date": "20210401",
    //   "00work": "111111",      "00color": "#ff0000",      "01work": "222222",      "01color": "#00ff00",
    //   "02work": "333333",      "02color": "#0000ff",      "03work": "444444",      "03color": "#ffff00",
    //   "04work": "111111",      "04color": "#ff0000",      "05work": "222222",      "05color": "#00ff00",
    //   "06work": "333333",      "06color": "#0000ff",      "07work": "444444",      "07color": "#ffff00",
    //   "08work": "111111",      "08color": "#ff0000",      "09work": "222222",      "09color": "#00ff00",
    //   "10work": "333333",      "10color": "#0000ff",      "11work": "444444",      "11color": "#ffff00",
    //   "12work": "111111",      "12color": "#ff0000",      "13work": "222222",      "13color": "#00ff00",
    //   "14work": "333333",      "14color": "#0000ff",      "15work": "444444",      "15color": "#ffff00",
    //   "16work": "111111",      "16color": "#ff0000",      "17work": "222222",      "17color": "#00ff00",
    //   "18work": "333333",      "18color": "#0000ff",      "19work": "444444",      "19color": "#ffff00",
    //   "20work": "111111",      "20color": "#ff0000",      "21work": "222222",      "21color": "#00ff00",
    //   "22work": "333333",      "22color": "#0000ff",      "23work": "444444",      "23color": "#ffff00"
    // },
    // {
    //   "id": 2,
    //   "date": "20210402",
    //   "00work": "555555",      "00color": "#ff00ff",      "01work": "222222",      "01color": "#00ff00",
    //   "02work": "333333",      "02color": "#0000ff",      "03work": "444444",      "03color": "#ffff00",
    //   "04work": "555555",      "04color": "#ff00ff",      "05work": "222222",      "05color": "#00ff00",
    //   "06work": "333333",      "06color": "#0000ff",      "07work": "444444",      "07color": "#ffff00",
    //   "08work": "555555",      "08color": "#ff00ff",      "09work": "222222",      "09color": "#00ff00",
    //   "10work": "333333",      "10color": "#0000ff",      "11work": "444444",      "11color": "#ffff00",
    //   "12work": "555555",      "12color": "#ff00ff",      "13work": "222222",      "13color": "#00ff00",
    //   "14work": "333333",      "14color": "#0000ff",      "15work": "444444",      "15color": "#ffff00",
    //   "16work": "555555",      "16color": "#ff00ff",      "17work": "222222",      "17color": "#00ff00",
    //   "18work": "333333",      "18color": "#0000ff",      "19work": "444444",      "19color": "#ffff00",
    //   "20work": "555555",      "20color": "#ff00ff",      "21work": "222222",      "21color": "#00ff00",
    //   "22work": "333333",      "22color": "#0000ff",      "23work": "444444",      "23color": "#ffff00"
    // },
  // {
  //   "id": 4,
  //   "date": "20210402",
  //   "00work": "game", "00color": "#fa661b", "01work": "unknow", "01color": "#000000",
  //   "02work": "cod020202", "02color": "#ff0000", "03work": "eat030303", "03color": "#00ff00",
  //   "04work": "unknow", "04color": "#000000", "05work": "unknow", "05color": "#000000",
  //   "06work": "unknow", "06color": "#000000", "07work": "unknow", "07color": "#000000",
  //   "08work": "unknow", "08color": "#000000", "09work": "unknow", "09color": "#000000",
  //   "10work": "unknow", "10color": "#000000", "11work": "unknow", "11color": "#000000",
  //   "12work": "unknow", "12color": "#000000", "13work": "unknow", "13color": "#000000",
  //   "14work": "unknow", "14color": "#000000", "15work": "unknow", "15color": "#000000",
  //   "16work": "unknow", "16color": "#000000", "17work": "unknow", "17color": "#000000",
  //   "18work": "unknow", "18color": "#000000", "19work": "unknow", "19color": "#000000",
  //   "20work": "unknow", "20color": "#000000", "21work": "unknow", "21color": "#000000",
  //   "22work": "unknow", "22color": "#000000", "23work": "unknow", "23color": "#000000"
  // },
  //   {
  //     "id": 5,
  //     "date": "20210403",
  //     "00work": "game",      "00color": "#fa661b",    "01work": "unknow",      "01color": "#000000",
  //     "02work": "cod020202",      "02color": "#ff0000",      "03work": "eat030303",      "03color": "#00ff00",
  //     "04work": "unknow",      "04color": "#000000",      "05work": "unknow",      "05color": "#000000",
  //     "06work": "unknow",      "06color": "#000000",      "07work": "unknow",      "07color": "#000000",
  //     "08work": "unknow",      "08color": "#000000",      "09work": "unknow",      "09color": "#000000",
  //     "10work": "unknow",      "10color": "#000000",      "11work": "unknow",      "11color": "#000000",
  //     "12work": "unknow",      "12color": "#000000",      "13work": "unknow",      "13color": "#000000",
  //     "14work": "unknow",      "14color": "#000000",      "15work": "unknow",      "15color": "#000000",
  //     "16work": "unknow",      "16color": "#000000",      "17work": "unknow",      "17color": "#000000",
  //     "18work": "unknow",      "18color": "#000000",      "19work": "unknow",      "19color": "#000000",
  //     "20work": "unknow",      "20color": "#000000",      "21work": "unknow",      "21color": "#000000",
  //     "22work": "unknow",      "22color": "#000000",      "23work": "unknow",      "23color": "#000000"
  //   }
  // ];


  for (const elem of chartsData) {
    delete elem.id;
    delete elem.date;
  }

  console.log('chartsData ::: =======================');
  console.log(chartsData);

  console.log('------------------------------------------------------------- Цикл ***');

  let _tempArray = [];
  let _tempSet = new Set();

  for (const elem of chartsData) {

    let _elemArr = Object.entries(elem);
    console.log('Object.entries(elem)');
    console.log(Object.entries(elem));

    for (let i = 0; i < _elemArr.length - 1; i++) {
      let _tempArr = [];
      if (_elemArr[i][0].slice(0,2) === _elemArr[i+1][0].slice(0,2)
        && _elemArr[i][0].slice(2) === 'work'
        && _elemArr[i+1][0].slice(2) === 'color') {
        _tempArr.push(_elemArr[i][1]);
        _tempArr.push(_elemArr[i+1][1]);
        // console.log(`${_elemArr[i][1]} -- ${_elemArr[i+1][1]}`);
        console.log(_tempArr);
        _tempArray.push(_tempArr);
        _tempSet.add(JSON.stringify(_tempArr));
      }
    }
  }

  console.log('_tempArray');
  console.log(_tempArray);
  console.log('_tempSet');
  console.log(_tempSet);

  console.log('------------------------------------------------------------- ***');

  let resultSetToArray = [];
  _tempSet.forEach((elem, key, _tempSet) => {
    resultSetToArray.push(JSON.parse(elem))
  })

  console.log('resultSetToArray');
  console.log([...resultSetToArray]);

  for (const elem of resultSetToArray) {
    elem.push(0);
  }

  console.log('resultSetToArray + 0');
  console.log([...resultSetToArray]);

  for (const elemA of _tempArray) {
    for (const elemS of resultSetToArray) {
      if (elemA[0] === elemS[0] && elemA[1] === elemS[1]) {
        elemS[2] += 1;
      }
    }
  }

  console.log('resultSetToArray + number');
  console.log([...resultSetToArray]);

  //TODO :::
  //... реализовать цикл
  //... протестировать цикл
  //... переименовать массив

  //TODO :::
  //..."откусывать" от массива по два элемента : 0-й и 1-й
  //...помещать в массив [действие(0), цвет_действия(1)]
  //...и все эти массивы 1) поместить в родительский массив
  //...и все эти массивы 2) пропустить через JSON.srtingify и поместить в Set
  //...сделать из Set массив, добавить в каждый элемент счетчик : [действие(0), цвет_действия(1), счетчик(2) = 0]
  //...бежать по родительскому массиву и при совпадении (0) и (1) инкрементировать (2)


  const onChangeHandlerDateBegin = (e) => {
    setDateBegin(e.target.value);
    console.log(e.target.value);
  }

  const onChangeHandlerDateEnd = (e) => {
    setDateEnd(e.target.value);
    console.log(e.target.value);
  }


  return (
    <section className='charts'>
      <h1 className='charts__title'>Charts</h1>
      <div className='charts__dates'>
        <div className='p-field p-col-12 p-md-4 charts__date'>
          <Calendar
            id='currentDateBegin'
            dateFormat='dd.mm.yy'
            value={dateBegin}
            onChange={onChangeHandlerDateBegin}
            minDate={minDate}
            maxDate={maxDate}
            showIcon
            readOnlyInput
          />
        </div>
        <div className='p-field p-col-12 p-md-4 charts__date'>
          <Calendar
            id='currentDateEnd'
            dateFormat='dd.mm.yy'
            value={dateEnd}
            onChange={onChangeHandlerDateEnd}
            minDate={minDate}
            maxDate={maxDate}
            showIcon
            readOnlyInput
          />
        </div>
      </div>
      <div className='charts__buttons'>
        <Button
          className='p-button-lg charts__button charts__button--get'
          label='Get timetrack'
          icon='pi pi-cloud-download'
          onClick={fetchCharts}
        />
      </div>

      <Button className='p-button-rounded charts__button charts__button--chart'>
        <svg
          className='charts__svg'
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-240 -240 1500 1500"
        >
          <path
            className='charts__svg--path'
            fill="#000000"
            d="M437 542c-1.8-3.2-2.4-7-1.7-10.6l76.3-405c1.7-9-4.5-17.6-13.5-18.9-20.8-3.1-42.1-4.8-63.8-4.8C187.6 102.7-11 308.3.5 557.5c10.4 226 196.4 407.9 422.6 413.6 64.3 1.6 125.6-10.7 181-34.3 20.6-8.7 28.8-33.6 18.1-53.3L437 542zm533.8-161.7c-6.3-16.2-25-23.7-40.8-16.3L594.2 523.5c-15.5 7.4-21.6 26.2-13.5 41.2l177.2 326.8c8.3 15.4 28 20.3 42.7 10.8C920.6 825 1000 690.3 1000 537c0-55.3-10.4-108.1-29.2-156.7zM560.6 432L891 275.1c11.8-5.6 16.7-20.1 10.4-31.6C843.7 138 743.4 59 623.7 29.6c-12.7-3.1-25.3 5.3-27.7 18.1l-67.7 359.4c-3.5 18.4 15.4 32.9 32.3 24.9z"/>
        </svg>
      </Button>


      { isLoading && <Loader/> }
      { errorMessage && <Error message={errorMessage}/> }

      {
        !isLoading && !errorMessage &&
          <div className='card'>
            <PolarArea chartData={resultSetToArray}/>
          </div>
      }




    </section>
  )
}

export default Charts;

/**
 *
 * {
    "dateBegin":"20210331",
    "dateEnd":"20210402"
}
 *
 *
 *
 *[
 {
        "id": 2,
        "date": "20210331",
        "00work": "unknow",
        "00color": "#000000",
        "01work": "unknow",
        "01color": "#000000",
        "02work": "unknow",
        "02color": "#000000",
        "03work": "unknow",
        "03color": "#000000",
        "04work": "unknow",
        "04color": "#000000",
        "05work": "unknow",
        "05color": "#000000",
        "06work": "unknow",
        "06color": "#000000",
        "07work": "unknow",
        "07color": "#000000",
        "08work": "unknow",
        "08color": "#000000",
        "09work": "unknow",
        "09color": "#000000",
        "10work": "unknow",
        "10color": "#000000",
        "11work": "unknow",
        "11color": "#000000",
        "12work": "unknow",
        "12color": "#000000",
        "13work": "unknow",
        "13color": "#000000",
        "14work": "unknow",
        "14color": "#000000",
        "15work": "unknow",
        "15color": "#000000",
        "16work": "unknow",
        "16color": "#000000",
        "17work": "unknow",
        "17color": "#000000",
        "18work": "unknow",
        "18color": "#000000",
        "19work": "unknow",
        "19color": "#000000",
        "20work": "unknow",
        "20color": "#000000",
        "21work": "unknow",
        "21color": "#000000",
        "22work": "unknow",
        "22color": "#000000",
        "23work": "unknow",
        "23color": "#000000"
    },
 {
        "id": 3,
        "date": "20210401",
        "00work": "coding",
        "00color": "#ff0000",
        "01work": "eat",
        "01color": "#00ff00",
        "02work": "завтрак",
        "02color": "#0000ff",
        "03work": "coding",
        "03color": "#00cc00",
        "04work": "walk",
        "04color": "#00ccff",
        "05work": "game",
        "05color": "#fa661b",
        "06work": "walk",
        "06color": "#00ccff",
        "07work": "coding44444555",
        "07color": "#b963cf",
        "08work": "unknow",
        "08color": "#000000",
        "09work": "unknow",
        "09color": "#000000",
        "10work": "unknow",
        "10color": "#000000",
        "11work": "unknow",
        "11color": "#000000",
        "12work": "unknow",
        "12color": "#000000",
        "13work": "unknow",
        "13color": "#000000",
        "14work": "unknow",
        "14color": "#000000",
        "15work": "unknow",
        "15color": "#000000",
        "16work": "unknow",
        "16color": "#000000",
        "17work": "unknow",
        "17color": "#000000",
        "18work": "unknow",
        "18color": "#000000",
        "19work": "unknow",
        "19color": "#000000",
        "20work": "unknow",
        "20color": "#000000",
        "21work": "unknow",
        "21color": "#000000",
        "22work": "unknow",
        "22color": "#000000",
        "23work": "2021-13-04--20-31",
        "23color": "#e67ce6"
    },
 ]
 *
 *
 *
 *
 *
 *
 *





 //---------------------------------------------------------------------------------------------------
 // const chartData = {
  //   datasets: [{
  //     data: [
  //       11,
  //       16,
  //       7,
  //       3,
  //       14
  //     ],
  //     backgroundColor: [
  //       "#42A5F5",
  //       "#66BB6A",
  //       "#FFA726",
  //       "#26C6DA",
  //       "#7E57C2"
  //     ],
  //     label: 'My dataset'
  //   }],
  //   labels: [
  //     "Red",
  //     "Green",
  //     "Yellow",
  //     "Grey",
  //     "Blue"
  //   ]
  // };
 //
 // const lightOptions = {
  //   legend: {
  //     labels: {
  //       fontColor: '#495057'
  //     }
  //   },
  //   scale: {
  //     gridLines: {
  //       color: '#ebedef'
  //     }
  //   }
  // };


 //---------------------------------------------------------------------------------------------------


 * **/
