import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'primeicons/primeicons.css';
import './Works.scss';
import Loader from '../Loader';
import Error from '../Error';
import DataIsEmpty from '../DataIsEmpty';
import ControlButton from '../ControlButton';
import { request } from '../../utils/utils';

//TODO :::
//1) переместить функцию request в utils.js
//2) экспортировать её сюда и проверить работу
//3) переписать useEffect с использованием этой функции
//TODO : 4) id успешно отправлен на сервер 3033, выведен в консоль, сделать запрос к БД
//TODO : 5) получить ответ от БД, обработать и отправить на фронт
//TODO : 6) фронт : получить ответ от сервера, обработать и принять решение о перерендере списка

const Works = () => {
  console.log('render Works...');

  const [worksFrontend, setWorksFrontend] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const dataIsEmptyTitle = `Table WORKS is empty!`;
  const dataIsEmptyMessage = `Add a new work to this table!`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // запрос к серверу
        // const serverResponse = await request(`${SERVER_URL}/api/works`);
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
        setErrorMessage(`Works --> useEffect --> ${error}`);
      }
      setIsLoading(false);
    };

    fetchData().then( _ => _ );
  }, []);

  const deleteWorkFrontend = async (id) => {
    console.log(`...delete work[${id}]`);

    try {
      // запрос к серверу
      const serverResponse = await request(`/api/works/${id}`, 'DELETE');
      //ответ от сервера
      await console.log(`- - - serverResponse  = `);
      await console.log(serverResponse.id);
      await console.log(serverResponse.message);

      //TODO :::
      //TODO : распарсить ответ от сервера и
      //TODO : 1) если получена ошибка - вывести ошибку
      //2) если ошибок нет - перерисовать компонент с удаленным work

      //TODO : 3) в css не работает transition, использовать react-transition... ???


      let works = worksFrontend.filter(elem => elem.id !== serverResponse.id)
      setWorksFrontend(works);

    } catch (err) {
      setErrorMessage(`Works --> deleteWorkFrontend --> ${err}`);
    }

  }

  /**
   * async removeContact(id) {
      await request(`/api/contacts/${id}`, 'DELETE')
      this.contacts = this.contacts.filter(c => c.id !== id);
      }
   },
   * **/

  if (isLoading) {
    return (
      <Loader />
    )
  }

  if (errorMessage) {
    return (
      <Error message={errorMessage}/>
    )
  }

  return (
    <section className='works'>
      <h1 className='works__header'>Works</h1>

      <NavLink exact={true} to={`/work/insert`}>
        <ControlButton
          icon='pi pi-plus'
          classes='p-button-danger p-px-4 p-py-3'
          controlHandler={() => {}}
        />
      </NavLink>


      {/*<Switch>*/}
      {/*  <Route exact={true} path={'/works/:id'} component={ ChangeWork } />*/}
      {/*</Switch>*/}



      { worksFrontend.length
        ?
        <ul className='works__list'>
          {
            worksFrontend.map(w => (
              <li key={w.id} className='works__item'>

                <div className='works__info'>
                  {/*<span className='works__id' style={{backgroundColor: w.bgColor}}>{w.id}</span>*/}
                  <span className='works__bgColor' style={{backgroundColor: w.bgColor}}/>
                  <span className='works__work'>{w.work}</span>
                </div>
                <div className='works__controls'>
                  <ControlButton
                    icon='pi pi-trash'
                    classes='p-button-danger p-px-3 p-py-2 p-mr-2'
                    controlHandler={() => deleteWorkFrontend(w.id)}
                  />
                  <NavLink exact={true} to={`/work/change/${w.id}`}>
                    <ControlButton
                      icon='pi pi-pencil'
                      classes='p-button-help p-px-3 p-py-2'
                      controlHandler={() => {}}
                    />
                  </NavLink>
                </div>
              </li>
            ))
          }
        </ul>
        :
        <DataIsEmpty
          header={dataIsEmptyTitle}
          message={dataIsEmptyMessage}
        />
      }
    </section>
  )
}

export default Works;

//*********************************************************************************************************

//TODO ::: 2021-03-02 :::
//Неправильно передавать объект в NavLink, данные видны в адресной строке
//Передавать надо id, делать по id запрос на сервер и уже оттуда получить данные
//TODO : Заполнить ими форму, отредактировать(или не редактировать!)...
//TODO : ... сравнить с ранее полученными и если есть разница...
//TODO : ... отправить на сервер методом PUT (неа... CORS запрещает), тогда POST, его CORS не запрещает
//TODO : ... получить ответ...
//TODO : ... обработать ответ...
//TODO : ... отправить ответ на фронт...
//TODO : ... перерендерить компонент Works на фронте
//TODO : ............................................
//TODO : 2й вариант === вводить MobX?
//TODO : для перехода на компонент

/**
 * import 'primereact/resources/themes/saga-blue/theme.css';
 import 'primereact/resources/primereact.min.css';
 import 'primeicons/primeicons.css';
 */

/**
 *  useEffect(() => {

    setIsLoading(true);

    setWorksFrontend(
      [
        {id: '1', bgColor: 'rgba(158, 158, 158, 0.67)', work: 'sleep'},
        {id: '7', bgColor: 'rgba(103, 58, 183, 0.62)', work: 'walk'},
      ]
    );

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    // setIsLoading(false);

  }, []);
 */
