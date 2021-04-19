import React, {useState} from 'react';
import './Charts.scss';
import Loader from '../Loader';
import Error from '../Error';
import {Calendar} from "primereact/calendar";

const Charts = () => {
  console.log('render Charts...');

  const today = new Date();
  const [dateBegin, setDateBegin] = useState(today);
  const [dateEnd, setDateEnd] = useState(today);
  // const [timetrack, setTimetrack] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [worksFrontend, setWorksFrontend] = useState([]);
  // const [changedTimetrack, setChangedTimetrack] = useState([]);

  let minDate = new Date(2021, 2, 30);
  let maxDate = new Date();





let _arr0 = [
    {
      "id": 3,
      "date": "20210401",
      "00work": "coding",      "00color": "#ff0000",      "01work": "eat",      "01color": "#00ff00",
      "02work": "завтрак",      "02color": "#0000ff",      "03work": "coding",      "03color": "#00cc00",
      "04work": "walk",      "04color": "#00ccff",      "05work": "game",      "05color": "#fa661b",
      "06work": "walk",      "06color": "#00ccff",      "07work": "coding44444555",      "07color": "#b963cf",
      "08work": "unknow",      "08color": "#000000",      "09work": "unknow",      "09color": "#000000",
      "10work": "unknow",      "10color": "#000000",      "11work": "unknow",      "11color": "#000000",
      "12work": "unknow",      "12color": "#000000",      "13work": "unknow",      "13color": "#000000",
      "14work": "unknow",      "14color": "#000000",      "15work": "unknow",      "15color": "#000000",
      "16work": "unknow",      "16color": "#000000",      "17work": "unknow",      "17color": "#000000",
      "18work": "unknow",      "18color": "#000000",      "19work": "unknow",      "19color": "#000000",
      "20work": "unknow",      "20color": "#000000",      "21work": "unknow",      "21color": "#000000",
      "22work": "unknow",      "22color": "#000000",      "23work": "2021-13-04--20-31",      "23color": "#e67ce6"
    },
    {
      "id": 4,
      "date": "20210402",
      "00work": "game",      "00color": "#fa661b",    "01work": "unknow",      "01color": "#000000",
      "02work": "cod020202",      "02color": "#ff0000",      "03work": "eat030303",      "03color": "#00ff00",
      "04work": "unknow",      "04color": "#000000",      "05work": "unknow",      "05color": "#000000",
      "06work": "unknow",      "06color": "#000000",      "07work": "unknow",      "07color": "#000000",
      "08work": "unknow",      "08color": "#000000",      "09work": "unknow",      "09color": "#000000",
      "10work": "unknow",      "10color": "#000000",      "11work": "unknow",      "11color": "#000000",
      "12work": "unknow",      "12color": "#000000",      "13work": "unknow",      "13color": "#000000",
      "14work": "unknow",      "14color": "#000000",      "15work": "unknow",      "15color": "#000000",
      "16work": "unknow",      "16color": "#000000",      "17work": "unknow",      "17color": "#000000",
      "18work": "unknow",      "18color": "#000000",      "19work": "unknow",      "19color": "#000000",
      "20work": "unknow",      "20color": "#000000",      "21work": "unknow",      "21color": "#000000",
      "22work": "unknow",      "22color": "#000000",      "23work": "unknow",      "23color": "#000000"
    }
  ];

  // let _arr1 = JSON.parse(JSON.stringify(_arr0));

  for (const elem of _arr0) {
    delete elem.id;
    delete elem.date;
    console.log(elem);
  }

  let _ = Object.entries(_arr0[0]);
  console.log('Object.entries(_arr0[0])');
  console.log(Object.entries(_arr0[0]));

  //TODO :::
  //TODO ..."откусывать" от массива по два элемента : 0-й и 1-й
  //TODO ...помещать в массив [действие(0), цвет_действия(1)]
  //TODO ...и все эти массивы поместить 1) в родительский массив
  //TODO ...и все эти массивы поместить 2) в Set
  //TODO ...сделать из Set массив, добавить в каждый элемент счетчик : [действие(0), цвет_действия(1), счетчик(2) = 0]
  //TODO ...бежать по родительскому массиву и при совпадении (0) и (1) инкрементировать (2)















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




      { isLoading && <Loader/> }
      { errorMessage && <Error message={errorMessage}/> }

      {
        !isLoading && !errorMessage &&
        <h2>Основной контент</h2>
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
 {
        "id": 4,
        "date": "20210402",
        "00work": "game",
        "00color": "#fa661b",
        "01work": "unknow",
        "01color": "#000000",
        "02work": "cod020202",
        "02color": "#ff0000",
        "03work": "eat030303",
        "03color": "#00ff00",
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
    }
 ]
 *
 *
 * **/
