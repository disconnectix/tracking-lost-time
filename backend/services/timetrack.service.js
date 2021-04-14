const { database } = require('../../database/database.js');
const { defaultRecord } = require('../../src/components/TimeTrack/defaultRecord.js');

const getTimetrackDateBackend = (req, res) => {
  console.log(`timetrack.service -- getTimetrackDateBackend -- req.body : `);

  //TODO ::: в req.body жду с фронта объект примерно такого вида :
  //TODO ... { "data" : "20210331" }

    console.log(req.body);

    const { date } = req.body;

    console.log(date);

  try {
    let timetrackBackend = {};
    // запрос к БД
    database.query(`SELECT * FROM timetrack WHERE date = ${date}`,
      (err, results, fields) => {
        if (err) {
          //возвращаем объект с ошибкой на фронт
          res.status(500).json({
            date,
            message: `*** ERROR-500 --> getTimetrackDateBackend (try) : ${err}`,
            error: true,
          })

        } else {

        if (!results[0]) {

          //TODO :::
          //+ если results[0] === undefined...
          //+ ...значит ответ сервера пуст, т е указанная в запросе дата не содержится в БД...
          //+ ...значит надо создать запись в БД...
          //+ ...содержащую эту запись с дефолтным заполнением полей...
          //+ ...получить от БД подтверждение о создании этой записи...
          //+ ... и вернуть результат на фронт

          const sqlQuery = `INSERT INTO timetrack (date) VALUES ('${date}')`;

          console.log('************* sqlQuery ************** ');
          console.log(sqlQuery);

          //запрос к БД
          database.query(sqlQuery,
            (err, results, fields) => {
              //results = ответ от БД
              console.log('------------------- results insert -----------------------');
              console.log(results);
              if (err) {
                console.log('------------------- err insert ----------------------');
                console.log(err);
                //возвращаем объект с ошибкой на фронт
                res.status(500).json({
                  date,
                  message: `*** ERROR-500 --> getTimetrackDateBackend (insert) : ${err}`,
                  error: true,
                });

              } else {

                console.log('+++ INSERT is successfully!');
                console.log({...defaultRecord, id: results.insertId, date});
                //возвращаем обработанный объект на фронт
                res.status(200).json({
                  ...defaultRecord,
                  id: results.insertId,
                  date,
                  message: `+++ INSERT is successfully!`,
                  error: false,
                });
              }
            })
        } else {
          timetrackBackend = results[0];
          //results = ответ от БД
          console.log('------------------- getTimetrackDateBackend --> results[0] :');
          console.log(results[0]);
          //возвращаем обработанный объект на фронт
          res.status(200).json(timetrackBackend);
        }
      }
    })
  } catch (err) {
    console.log('------------------- error catch getTimetrackDateBackend :');
    console.log(err);
    //возвращаем объект с ошибкой на фронт
    res.status(500).json({ error: `*** ERROR-500 --> getTimetrackDateBackend (catch) : ${err}` })
  }
}

const updateTimetrackBackend = (req, res) => {
  console.log(`timetrack.service -- updateTimetrackBackend -- req.body : `);
  console.log(req.body);
  console.log(`timetrack.service -- updateTimetrackBackend -- req.params : `);
  console.log(req.params);
  console.log(req.params.date);

  const date = req.params.date;
  // const { work, bgColor, method } = req.body;

  //TODO :::
  //TODO Протестировать запрос UPDATE в БД

  // UPDATE `works` SET `work`='eat2',`bgcolor`='#ff3302' WHERE id = 11

  try {

    let setPart = ``;

    for (const [key, value] of Object.entries(req.body)) {
      setPart += `${key}='${value}', `;
    }

    setPart = setPart.trimEnd().slice(0, -1);
    console.log('--- setPart >>>');
    console.log(setPart);

    let sqlQuery = ``;

    if (setPart) {
      sqlQuery = `UPDATE timetrack SET `;
      sqlQuery += setPart;
      sqlQuery += ` WHERE date='${date}'`;
    } else {
      res.status(500).json({ error: `*** ERROR-500 --> updateTimetrackBackend (query) : req.body is EMPTY` })
    }

    console.log('--- sqlQuery UPDATE >>> ');
    console.log(sqlQuery);

    // запрос к БД
    database.query(sqlQuery,
      (err, results, fields) => {
        //err = ошибка
        console.log('------------------- err UPDATE ----------------------');
        console.log(err);
        //results = ответ от БД
        console.log('------------------- results UPDATE -----------------------');
        console.log(results);
        if (err) {
          //возвращаем объект с ошибкой на фронт
          res.status(500).json({ error: `*** ERROR-500 --> updateTimetrackBackend (try) : ${err}` })
        } else {
          // workBackend.id = results[0].id.toString();
          // workBackend.work = results[0].work;
          // workBackend.bgColor = results[0].bgcolor;
          // workBackend.bgColor = '#88b4b4';

          //возвращаем обработанный объект на фронт
          res.status(200).json({
            date: req.params.date,
            message: `UPDATE : '${req.params.date}' --> is success!`,
            error: false,
          });
        }
      })
  } catch (err) {
    console.log('------------------- error catch updateTimetrackBackend 1 -----------------------');
    console.log(err);
    //возвращаем объект с ошибкой на фронт
    res.status(500).json({ error: `*** ERROR-500 --> updateTimetrackBackend (catch) : ${err}` })
  }
}

const getTimetrackIntervalBackend = (req, res) => {
  console.log(`timetrack.service -- getTimetrackIntervalBackend -- req.body : `);

  //TODO ::: в req.body жду с фронта объект примерно такого вида :
  //TODO ... { "dateBegin" : "20210331", "dateEnd" : "20210401" }

  console.log(req.body);

  const { dateBegin, dateEnd } = req.body;

  console.log(dateBegin);
  console.log(dateEnd);


  // SELECT * FROM `timetrack` WHERE date >= '20210331' AND date <= '20210401'

  try {
    let timetrackBackend = [];
    // запрос к БД
    database.query(`SELECT * FROM timetrack WHERE date >= '${dateBegin}' AND date <= '${dateEnd}'`,
      (err, results, fields) => {
        if (err) {
          //возвращаем объект с ошибкой на фронт
          res.status(500).json({ error: `*** ERROR-500 --> getTimetrackIntervalBackend (try) : ${err}` })
        } else {
          if (!results.length) {

            console.log(`INTERVAL : ['${dateBegin}' : '${dateEnd}'] not found!`);
            console.log(results.length);
            console.log(results);

            res.status(500).json({
              dateBegin,
              dateEnd,
              message: `INTERVAL : ['${dateBegin}' : '${dateEnd}'] not found!`,
              error: true,
              result: 'ERROR'
            });


          } else {


            //results = ответ от БД
            console.log('------------------- getTimetrackIntervalBackend --> results :');
            console.log(results);
            console.log('Array.isArray(results) ***');
            console.log(Array.isArray(results));

            //TODO ::: лучше возвращать results ? *********************************************************************

            timetrackBackend = results;

            //возвращаем обработанный объект на фронт
            res.status(200).json(timetrackBackend);
          }
        }
      })
  } catch (err) {
    console.log('------------------- error catch getTimetrackIntervalBackend :');
    console.log(err);
    //возвращаем объект с ошибкой на фронт
    res.status(500).json({ error: `*** ERROR-500 --> getTimetrackIntervalBackend (catch) : ${err}` })
  }
}




module.exports = { getTimetrackDateBackend, updateTimetrackBackend, getTimetrackIntervalBackend  }
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

 // const insertTimetrackBackend = (req, res) => {

  // const id = req.params.id;
  // const { work, bgColor, method } = req.body;

  //TODO :::
  //TODO Протестировать запрос в БД

  // UPDATE `works` SET `work`='eat2',`bgcolor`='#ff3302' WHERE id = 11


  // try {
  //   console.log('timetrack.service -- insertTimetrackBackend --> ');
  //
  //   //TODO ::: в req.body жду с фронта объект примерно такого вида :
  //   //TODO ... { "data" : "20210331" }
  //
  //   console.log(req.body);
  //
  //   const { date } = req.body;
  //
  //   console.log(date);

    // const sqlQuery = `INSERT INTO works (work, bgcolor) VALUES ('${work}', '${bgColor}')`;
    //
    // console.log('************* sqlQuery 2 ************** ');
    // console.log(sqlQuery);

    // запрос к БД
    // database.query(sqlQuery,
    //   (err, results, fields) => {
    //     //err = ошибка
    //     console.log('------------------- err 2 ----------------------');
    //     console.log(err);
    //     //results = ответ от БД
    //     console.log('------------------- results 2 -----------------------');
    //     console.log(results);
    //     // мета-данные полей
    //     // console.log(fields);
    //     if (err) {
    //       //возвращаем объект с ошибкой на фронт
    //       res.status(500).json({ error: `*** ERROR-500 --> insertWorkBackend (try) : ${err}` })
    //     } else {
    //       // workBackend.id = results[0].id.toString();
    //       // workBackend.work = results[0].work;
    //       // workBackend.bgColor = results[0].bgcolor;
    //       // workBackend.bgColor = '#88b4b4';
    //
    //       //возвращаем обработанный объект на фронт
    //       res.status(200).json({id: req.params.id, message: 'POST is success!'});
    //     }
    //   })
//   } catch (err) {
//     console.log('------------------- error catch insertWorkBackend :');
//     console.log(err);
//     //возвращаем объект с ошибкой на фронт
//     res.status(500).json({ error: `*** ERROR-500 --> insertWorkBackend (catch) : ${err}` })
//   }
// }


 module.exports = { getAllWorksBackend, removeWorkBackend, insertWorkBackend, getWorkBackend, updateWorkBackend  }


 *
 * */
