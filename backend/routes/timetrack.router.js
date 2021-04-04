const Router = require('express');

const {
  getTimetrackDateBackend,
  // removeWorkBackend,
  // getWorkBackend,
  updateTimetrackBackend,
  getTimetrackIntervalBackend,
  //insertTimetrackBackend
} = require('../services/timetrack.service.js');

const timetrackRouter = Router();

timetrackRouter.post('/api/timetrack', getTimetrackDateBackend);

// timetrackRouter.post('/api/timetrack/change/:id', updateTimetrackBackend);
timetrackRouter.put('/api/timetrack/:date', updateTimetrackBackend);

timetrackRouter.post('/api/timetrack/interval', getTimetrackIntervalBackend);


// timetrackRouter.post('/api/timetrack/insert', insertTimetrackBackend);
// timetrackRouter.delete('/api/works/:id', removeWorkBackend);

module.exports = { timetrackRouter }
