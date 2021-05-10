const express = require('express');
const path = require('path');
const cors = require('cors');
const { database } = require('./database/database.js');
const { worksRouter } = require('./backend/routes/works.router.js');
const { timetrackRouter } = require('./backend/routes/timetrack.router.js');

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(timetrackRouter);
app.use(worksRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
  console.log('Process.env.NODE_ENV === production ');
}

(async function startApp() {
  try {
    app.listen(PORT, () => {
      console.log(`+++ Server has been started on port ${PORT}...!`)
    });
    await database.getConnection(err => {
      err === null && console.log('+++ The connection to the MySQL backend is successfully...!');
      err !== null && console.error('ERROR of connect to MySQL : ' + err.message);
    })
  } catch (err) {
    console.log(`ERROR function startAPP with err=${err}`)
  }
}())

// startApp()





/**
 *
 *
 *
 // app.use(express.static(path.resolve(__dirname, './public')));
 // app.use(express.static(path.resolve(__dirname, './build')));
 // app.use(express.static(path.resolve(__dirname)));

 //************************************************************
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
