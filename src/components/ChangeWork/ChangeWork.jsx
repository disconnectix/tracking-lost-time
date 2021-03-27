import React, { useEffect, useState } from 'react';

import { ColorPicker } from 'primereact/colorpicker';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import './ChangeWork.scss';
import { request } from '../../utils/utils';
import Loader from '../Loader';
import Error from '../Error';
import { useParams, Redirect } from 'react-router-dom';

let prevWorkValue = '';
let prevColorValue = '';

const ChangeWork = () => {
  console.log('render ChangeWork...');

  const { id } = useParams();
  console.log('-------------------------------> id');
  console.log(id);
  // получаем параметры как props.match.params.id
  // const id = JSON.parse(props.match.params.id);

  const [changedWork, setChangedWork] = useState({});
  const [isRedirect, setIsRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [backMessage, setBackMessage] = useState('');
  const [frontMessage, setFrontMessage] = useState('Значения равны...');

  const [workValue, setWorkValue] = useState('');
  const [colorValue, setColorValue] = useState('#ffffff');

  const equalityOfTheOldAndNewValues = () => {
    console.log('workValue + colorValue --> ');
    console.log(workValue + colorValue);
    console.log('prevWorkValue + prevColorValue --> ');
    console.log(prevWorkValue + prevColorValue);
    console.log('(workValue + colorValue) === (prevWorkValue + prevColorValue)');
    console.log((workValue + colorValue) === (prevWorkValue + prevColorValue));

    return (workValue + colorValue) === (prevWorkValue + prevColorValue)
  }

  useEffect(() => {
    (workValue + colorValue) === (prevWorkValue + prevColorValue)
      ?
      setFrontMessage('Значения равны...')
      :
      setFrontMessage('Отправляем на сервер!');

    if (!workValue) {
      setFrontMessage('ОШИБКА : Значение "work" не определено!')
    }

    if (!colorValue) {
      setFrontMessage('ОШИБКА : Значение "color" не определено!')
    }

  }, [workValue, colorValue]);

  useEffect(() => {
    const fetchWorkById = async () => {
      try {
        // запрос к серверу
        // const serverResponse = await request(`${SERVER_URL}/api/work/${id}`);
        const serverResponse = await request(`/api/work/${id}`);
        //ответ от сервера
        console.log('serverResponse --> ');
        console.log(serverResponse);

        // если response - это объект с ожидаемыми полями, значит пришли ожидаемые данные (утиная типизация!)
        // If it looks like a duck, swims like a duck and quacks like a duck, then it probably is a duck :))
        if (serverResponse.id && serverResponse.work && serverResponse.bgColor) {
          //serverResponse.id
          console.log(`id : ${serverResponse.id}`);
          setChangedWork({...serverResponse});
          setWorkValue(serverResponse.work);
          setColorValue(serverResponse.bgColor);
          prevWorkValue = serverResponse.work;
          prevColorValue = serverResponse.bgColor;
        } else {
          // если serverResponse - это объект, значит пришла ошибка
          setBackMessage(JSON.stringify(serverResponse.error));
        }
      } catch (error) {
        setBackMessage(`ChangeWork --> useEffect --> ${error}`);
      }
      setIsLoading(false);
    };

    fetchWorkById().then( _ => _ );

  }, [id]);

//TODO :::
//1) сделать форму, заполнить пришедшими с сервера данными
//2) POST запрос на сервер с данными формы
//TODO 3) получить ответ, проанализировать, вывести ошибку если пришла ошибка
//TODO 4) получить ответ, проанализировать, вывести ошибку если пришла ошибка
//TODO 5) если всё ок --> редирект на страницу Works
//5) как проверить, что пришел объект с нужными ненулевыми полями?...


  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const color = colorValue[0] === '#' ? colorValue : '#' + colorValue;

      //TODO :::
      //Отправлять запрос, если выполняются два условия :
      //1) поле workValue и color - не пустые
      //2) поля workValue и color не равны предыдущим
      //Кнопка Submit должна на это реагировать
      //Сообщение об ошибке для пустых полей поместить в отдельный state...
      //... и выводить на страницу

      // запрос к серверу
      const serverResponse = await request(
        // `${SERVER_URL}/api/work/${id}`,
        `/api/work/change/${id}`,
        'POST',
        // 'UPDATE',
        {
          id,
          work: workValue,
          bgColor: color,
          method: 'UPDATE',
        }
      );
      //ответ от сервера
      console.log('serverResponse -- POST data + method --> ');
      console.log(serverResponse);

      if (!serverResponse) {
        throw Error({message: 'Ответ сервера пуст!'})
      }

      setIsRedirect(true);

    } catch (err) {
      console.log(`UPDATE request is failed...! ${err.message}`);
    }
    setIsLoading(false);
  }



  if (isLoading) {
    return (
      <Loader />
    )
  }

  if (backMessage) {
    return (
      <Error message={backMessage}/>
    )
  }

  if (isRedirect) {
    return (
      <Redirect to={`/works`} />
    )
  }

  return (
    <section className='changeWork'>

      <h1>Change Work</h1>
      <h5>id={changedWork.id}</h5>
      <h5>bgColor={changedWork.bgColor}</h5>
      <h5>frontMessage={frontMessage}</h5>

      <form onSubmit={onSubmit} className='changeWork__form'>
         <label className='changeWork__label'>Work* :</label>
         <div>
           <InputText
             className='changeWork__work'
             id='work'
             value={workValue}
             onChange={(e) => setWorkValue(e.target.value)}
           />
         </div>

         <label className='changeWork__label'>Change color :</label>
         <ColorPicker
           className='changeWork__color'
           value={colorValue}
           placeholder={workValue}
           onChange={(e) => {setColorValue(e.target.value)}}
         />

        {
          workValue && colorValue && !equalityOfTheOldAndNewValues()
          ?
          <Button
            className='changeWork__submit'
            type='submit'
            label='Submit'
            icon='pi pi-check'
            iconPos='left'
          />
        :
         <Button
           className='changeWork__submit'
           type='submit'
           label='Submit'
           icon='pi pi-check'
           iconPos='left'
           disabled
         />
        }
      </form>

    </section>
  )
}

export default ChangeWork;

/***
 * проверка на hex-цвет
 * "#123456".match( /#[a-f0-9]{6}\b/gi )
*/


/***
 * function RegisterYourCatForm() {
  const [values, setValues] = useState({
    name: '', color: '', age: '', habits: ''
  });

  const saveFormData = async () => {
    const response = await fetch('/api/registration', {
      method: 'POST',
      body: JSON.stringify(values)
    });
    if (response.status !== 200) {
      throw new Error(`Request failed: ${response.status}`);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default submission
    try {
      await saveFormData();
      alert('Your registration was successfully submitted!');
      setValues({
        name: '', color: '', age: '', habits: ''
      });
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
  }

  // ...

  return (
    <form onSubmit={onSubmit}>
</form>
);
}
 */

//------------------------------ CORS -----------------------------------

/**
 * 1.
 *
 * Вы уже сами почти все написали, только в Access-Control-Allow-Headers не добавили origin. Нужно:
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');

 Но проблема может быть еще и не в этом, если Вы пробуете делать это локально и обращаетесь к localhost,
 то вот оно и не будет работать, эти заголовки будут игнорироваться браузером.
 Используйте локальный IP вместо localhost пишите 127.0.0.1
 */

/**
 * 2.
 *
 * функция-callback является в этом примере middleware !!!
 *
 * Как вариант:
 *
 app.use(function (req, res, next) {
    var origins = [
        'http://example.com',
        'http://www.example.com'
    ];

    for(var i = 0; i < origins.length; i++){
        var origin = origins[i];

        if(req.headers.origin.indexOf(origin) > -1){
            res.header('Access-Control-Allow-Origin', req.headers.origin);
        }
    }

    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
 */

/**
 * 3.
 *
 * https://coderoad.ru/43150051/%D0%9A%D0%B0%D0%BA-%D0%B2%D0%BA%D0%BB%D1%8E%D1%87%D0%B8%D1%82%D1%8C-cors-nodejs-%D1%81-%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%D1%8E-express
 * */
