const Router = require('express');

const {
  getTimetrackDateBackend,
  updateTimetrackBackend,
  getTimetrackIntervalBackend,
} = require('../services/timetrack.service.js');

const timetrackRouter = Router();

timetrackRouter.get('/api/timetrack/:date', getTimetrackDateBackend);

// timetrackRouter.post('/api/timetrack/change/:id', updateTimetrackBackend);

timetrackRouter.post('/api/timetrack/:date', updateTimetrackBackend);
// timetrackRouter.put('/api/timetrack/:date', updateTimetrackBackend);

timetrackRouter.post('/api/timetrack/interval', getTimetrackIntervalBackend);


// timetrackRouter.post('/api/timetrack/insert', insertTimetrackBackend);
// timetrackRouter.delete('/api/works/:id', removeWorkBackend);

module.exports = { timetrackRouter }
