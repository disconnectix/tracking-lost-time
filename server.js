const express = require('express');
const cors = require('cors');
const path = require('path');

const { database } = require('./database/database.js');

const { worksRouter } = require('./backend/routes/works.router.js');

//web-backend -- создаем web-backend с помощью библиотеки express
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(worksRouter);

database.getConnection(err => {
  err
    ?
    console.error('*** Error of connect to MySQL : ' + err.message)
    :
    console.log('+++ The connection to the MySQL backend is successfully... Ok!');
})

// const works = [
//   {id: '1', work: '1111111', bgColor: '#025F34'},
//   {id: '2', work: '2222222', bgColor: '#525F34'},
//   {id: '3', work: '3333333', bgColor: '#925F34'},
//   {id: '4', work: '4444444', bgColor: '#A25F34'},
//   {id: '5', work: '5555555', bgColor: '#F25F34'},
// ]




// app.get('/api/works', (req, res) => {
//   try {
//
//      let worksBackend = [];
//      console.log('------------------- worksBackend -- step 1 -----------------------');
//      console.log(worksBackend);
//
//      // запрос к БД
//      database.query(`SELECT * FROM works`,
//      (err, results, fields) => {
//         //err = ошибка
//         console.log('------------------- err ----------------------');
//         console.log(err);
//         //results = ответ от БД
//         console.log('------------------- results -----------------------');
//         console.log(results);
//         // мета-данные полей
//         // console.log(fields);
//         if (err) {
//           //возвращаем объект с ошибкой на фронт
//           res.status(500).json({ error: `500 : Query "SELECT * FROM works" ended with error : ${err}` })
//         } else {
//           worksBackend = results.map(w => ({
//             id: w.id.toString(),
//             work: w.work,
//             bgColor: w.bgcolor
//           }));
//           console.log('------------------- worksBackend -- step 2 -----------------------');
//           console.log(worksBackend);
//           //возвращаем обработанный массив на фронт
//           res.status(200).json(worksBackend);
//         }
//       })
//
//     // console.log(works);
//     // await res.status(200).json(workss)
//     // await res.status(200).json(works)
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({message: `*** Error app.get to "/api/works" : ${error}`})
//   }
// })


// app.use(express.static(path.resolve(__dirname, './public')));
// app.use(express.static(path.resolve(__dirname, './build')));
// app.use(express.static(path.resolve(__dirname)));


if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'build')));

  console.log('*** production *** ');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}

const PORT = process.env.PORT ?? 5000;

//web-backend -- слушаем порт=PORT
app.listen(PORT, () => {
  console.log(`+++ Server has been started on port ${PORT}... Ok!`)
})

/**
 * // backend.js

 app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'path/to/your/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

 или

 app.use(function(req, res) {
    res.sendfile(__dirname + '/Public/index.html');
});

 * */
