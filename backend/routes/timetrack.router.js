const Router = require('express');

const {
  getTimetrackDateBackend,
  // removeWorkBackend,
  // getWorkBackend,
  // updateWorkBackend,
  // insertWorkBackend
} = require('../services/timetrack.service.js');

const timetrackRouter = Router();

timetrackRouter.get('/api/timetrack/:date', getTimetrackDateBackend);

// timetrackRouter.delete('/api/works/:id', removeWorkBackend);
// timetrackRouter.post('/api/work/insert', insertWorkBackend);
// timetrackRouter.get('/api/work/:id', getWorkBackend);
// timetrackRouter.post('/api/work/change/:id', updateWorkBackend);

module.exports = { timetrackRouter }
