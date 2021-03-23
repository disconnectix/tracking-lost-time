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
