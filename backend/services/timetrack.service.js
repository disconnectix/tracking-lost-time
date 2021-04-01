const { database } = require('../../database/database.js');

const getTimetrackDateBackend = (req, res) => {
  console.log('timetrack.service -- getTimetrackDateBackend -- req.params');
  console.log(req.params);
  console.log(req.params.date);

  const { date } = req.params;

  try {
    let timetrackBackend = {};
    // // запрос к БД
    // database.query(`SELECT * FROM works WHERE id = ${id}`,
    //   (err, results, fields) => {
    //     //err = ошибка
    //     console.log('------------------- getTimetrackDateBackend --> err :');
    //     console.log(err);
    //     //results = ответ от БД
    //     console.log('------------------- getTimetrackDateBackend --> results :');
    //     console.log(results);
    //     // мета-данные полей
    //     // console.log(fields);
    //     if (err) {
    //       //возвращаем объект с ошибкой на фронт
    //       res.status(500).json({ error: `*** ERROR-500 --> getTimetrackDateBackend (try) : ${err}` })
    //     } else {
    //       workBackend.id = results[0].id.toString();
    //       workBackend.work = results[0].work;
    //       workBackend.bgColor = results[0].bgcolor;

    timetrackBackend.date = date;
          //возвращаем обработанный объект на фронт
          res.status(200).json(timetrackBackend);
    //
    //       //проверка загрузки
    //       // setTimeout(() => {
    //       //   res.status(200).json(workBackend);
    //       // }, 3000)
    //
    //     }
    //   })
  } catch (err) {
    console.log('------------------- error catch getTimetrackDateBackend :');
    console.log(err);
    //возвращаем объект с ошибкой на фронт
    res.status(500).json({ error: `*** ERROR-500 --> getTimetrackDateBackend (catch) : ${err}` })
  }
  // database.end();
}


module.exports = { getTimetrackDateBackend  }

//module.exports = { getAllWorksBackend, removeWorkBackend, insertWorkBackend, getWorkBackend, updateWorkBackend  }


/**
 *
 * const { database } = require('../../database/database.js');

 const getAllWorksBackend = (req, res) => {
  try {
    let worksBackend = [];
    console.log('------------------- getAllWorksBackend -- step 1 -----------------------');
    console.log(worksBackend);

    // запрос к БД
    database.query(`SELECT * FROM works`,
      (err, results, fields) => {
        console.log('------------------- err ----------------------');
        console.log(err);
        console.log('------------------- results -- ответ от БД ---');
        console.log(results);
        // console.log(fields);// мета-данные полей
        if (err) {
          //возвращаем объект с ошибкой на фронт
          res.status(500).json({ error: `*** ERROR-500 --> getAllWorksBackend (try) : ${err}` })
        } else {
          worksBackend = results.map(w => ({
            id: w.id.toString(),
            work: w.work,
            bgColor: w.bgcolor
          }));
          console.log('------------------- getAllWorksBackend -- step 2 -----------------------');
          console.log(worksBackend);
          //возвращаем обработанный массив на фронт
          res.status(200).json(worksBackend);
        }
      })
  } catch (err) {
    console.log('------------------- error catch getAllWorksBackend -----------------------');
    console.log(err);
    //возвращаем объект с ошибкой на фронт
    res.status(500).json({ error: `*** ERROR-500 --> getAllWorksBackend (catch) : ${err}` })
  }
  // database.end();
}

 const removeWorkBackend = (req, res) => {
  console.log('worksService -- removeWorkBackend -- req.params');
  console.log(req.params);
  console.log(req.params.id);

  const {id} = req.params;

  try {
    // запрос к БД
    database.query(`DELETE FROM works WHERE id=${id}`,
      (err, results, fields) => {
        console.log('------------------- err ----------------------');
        console.log(err);
        console.log('------------------- results -- ответ от БД ----');
        console.log(results);
        // мета-данные полей
        // console.log(fields);
        if (err) {
          //возвращаем объект с ошибкой на фронт
          res.status(500).json({ error: `*** ERROR-500 --> removeWorkBackend (try) : ${err}` })
        } else {
          //возвращаем результат на фронт
          res.status(200).json({
            id,
            message: `Work with id=${id} has been removed!`
          })
        }
      })
  } catch (err) {
    console.log('------------------- error catch removeWorkBackend -----------------------');
    console.log(err);
    //возвращаем объект с ошибкой на фронт
    res.status(500).json({ error: `*** ERROR-500 --> removeWorkBackend (catch) : ${err}` })
  }
}

 const getWorkBackend = (req, res) => {
  console.log('worksService -- getWorkBackend -- req.params');
  console.log(req.params);
  console.log(req.params.id);

  const { id } = req.params;

  try {
    let workBackend = {};
    // запрос к БД
    database.query(`SELECT * FROM works WHERE id = ${id}`,
      (err, results, fields) => {
        //err = ошибка
        console.log('------------------- err ----------------------');
        console.log(err);
        //results = ответ от БД
        console.log('------------------- results -----------------------');
        console.log(results);
        // мета-данные полей
        // console.log(fields);
        if (err) {
          //возвращаем объект с ошибкой на фронт
          res.status(500).json({ error: `*** ERROR-500 --> getWorkBackend (try) : ${err}` })
        } else {
          workBackend.id = results[0].id.toString();
          workBackend.work = results[0].work;
          workBackend.bgColor = results[0].bgcolor;
          //возвращаем обработанный объект на фронт
          res.status(200).json(workBackend);

          //проверка загрузки
          // setTimeout(() => {
          //   res.status(200).json(workBackend);
          // }, 3000)

        }
      })
  } catch (err) {
    console.log('------------------- error catch getWorkBackend -----------------------***');
    console.log(err);
    //возвращаем объект с ошибкой на фронт
    res.status(500).json({ error: `*** ERROR-500 --> getWorkBackend (catch) : ${err}` })
  }
  // database.end();
}

 const updateWorkBackend = (req, res) => {

  const id = req.params.id;
  const { work, bgColor, method } = req.body;

  //TODO :::
  //TODO Протестировать запрос UPDATE в БД

  // UPDATE `works` SET `work`='eat2',`bgcolor`='#ff3302' WHERE id = 11

  //TODO Метод UPDATE должен изменять в БД точечно : т е ...
  //TODO ... только те данные, которые реально изменились ...
  //TODO ... значит изменения данных надо контролить еще на клиенте ...
  //TODO ... и сюда присылать только измененные поля

  //TODO Но в данный момент (пока) будет реализовано ...
  //TODO ... изменение всех пришедших данных

  try {
    console.log('worksService -- updateWorkBackend --> ');
    console.log(req.body);

    console.log(req.params);
    console.log(req.params.id);

    console.log(req.body.id);
    console.log(req.body.work);
    console.log(req.body.bgColor);

    let sqlQuery = ``;

    if (method === 'UPDATE') {
      sqlQuery = `UPDATE works SET `;
      if (work) { sqlQuery += `work='${work}',`}
      if (bgColor) { sqlQuery += ` bgcolor='${bgColor}' `}
      sqlQuery += `WHERE id=${id}`;
      // sqlQuery += `WHERE id=${id}`;
    }

    console.log('************* sqlQuery 1 ************** ');
    console.log(sqlQuery);

    // запрос к БД
    database.query(sqlQuery,
      (err, results, fields) => {
        //err = ошибка
        console.log('------------------- err 1 ----------------------');
        console.log(err);
        //results = ответ от БД
        console.log('------------------- results 1 -----------------------');
        console.log(results);
        // мета-данные полей
        // console.log(fields);
        if (err) {
          //возвращаем объект с ошибкой на фронт
          res.status(500).json({ error: `*** ERROR-500 --> updateWorkBackend (try) : ${err}` })
        } else {
          // workBackend.id = results[0].id.toString();
          // workBackend.work = results[0].work;
          // workBackend.bgColor = results[0].bgcolor;
          // workBackend.bgColor = '#88b4b4';

          //возвращаем обработанный объект на фронт
          res.status(200).json({id: req.params.id, message: `UPDATE : "${req.body.work}" --> is success!`});
        }
      })
  } catch (err) {
    console.log('------------------- error catch updateWorkBackend 1 -----------------------');
    console.log(err);
    //возвращаем объект с ошибкой на фронт
    res.status(500).json({ error: `*** ERROR-500 --> updateWorkBackend (catch) : ${err}` })
  }
  // database.end();
}

 const insertWorkBackend = (req, res) => {

  // const id = req.params.id;
  const { work, bgColor, method } = req.body;

  //TODO :::
  //TODO Протестировать запрос в БД

  // UPDATE `works` SET `work`='eat2',`bgcolor`='#ff3302' WHERE id = 11


  try {
    console.log('worksService -- insertWorkBackend --> ');
    console.log(req.body);

    // console.log(req.params);
    // console.log(req.params.id);

    // console.log(req.body.id);
    console.log(req.body.work);
    console.log(req.body.bgColor);

    let sqlQuery = ``;

    // if (method === 'UPDATE') {
    //   sqlQuery = `UPDATE works SET `;
    //   if (work) { sqlQuery += `work='${work}',`}
    //   if (bgColor) { sqlQuery += ` bgcolor='${bgColor}' `}
    //   sqlQuery += `WHERE id=${id}`;
    //   // sqlQuery += `WHERE id=${id}`;
    // }

    sqlQuery = `INSERT INTO works (work, bgcolor) VALUES ('${work}', '${bgColor}')`;

    console.log('************* sqlQuery 2 ************** ');
    console.log(sqlQuery);

    // запрос к БД
    database.query(sqlQuery,
      (err, results, fields) => {
        //err = ошибка
        console.log('------------------- err 2 ----------------------');
        console.log(err);
        //results = ответ от БД
        console.log('------------------- results 2 -----------------------');
        console.log(results);
        // мета-данные полей
        // console.log(fields);
        if (err) {
          //возвращаем объект с ошибкой на фронт
          res.status(500).json({ error: `*** ERROR-500 --> insertWorkBackend (try) : ${err}` })
        } else {
          // workBackend.id = results[0].id.toString();
          // workBackend.work = results[0].work;
          // workBackend.bgColor = results[0].bgcolor;
          // workBackend.bgColor = '#88b4b4';

          //возвращаем обработанный объект на фронт
          res.status(200).json({id: req.params.id, message: 'POST is success!'});
        }
      })
  } catch (err) {
    console.log('------------------- error catch insertWorkBackend 2 -----------------------');
    console.log(err);
    //возвращаем объект с ошибкой на фронт
    res.status(500).json({ error: `*** ERROR-500 --> insertWorkBackend (catch) : ${err}` })
  }
  // database.end();
}


 module.exports = { getAllWorksBackend, removeWorkBackend, insertWorkBackend, getWorkBackend, updateWorkBackend  }


 *
 * */
