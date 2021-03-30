const Router = require('express');
const {
  getAllWorksBackend,
  removeWorkBackend,
  getWorkBackend,
  updateWorkBackend,
  insertWorkBackend
} = require('../services/works.service.js');

const worksRouter = Router();

worksRouter.get('/api/works', getAllWorksBackend);
worksRouter.delete('/api/works/:id', removeWorkBackend);
worksRouter.post('/api/work/insert', insertWorkBackend);
worksRouter.get('/api/work/:id', getWorkBackend);
worksRouter.post('/api/work/change/:id', updateWorkBackend);

module.exports = { worksRouter }
