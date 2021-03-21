const Router = require('express');
const { getAllWorksBackend, removeWorkBackend, getWorkBackend, updateWorkBackend, insertWorkBackend } = require('../services/works.service.js');

//// import { Router } from 'express';
//// import { getAllWorksBackend } from '../controllers/worksService.js';

const worksRouter = Router();

worksRouter.get('/api/works', getAllWorksBackend);

// worksRouter.delete('/api/works/:id', removeWorkBackend);
// worksRouter.get('/api/work/:id', getWorkBackend);
//
// worksRouter.post('/api/work/change/:id', updateWorkBackend);
//
// worksRouter.post('/api/work/insert', insertWorkBackend);




// routerWorkload.post('/api/server', create);

//// export default worksRouter;
module.exports = { worksRouter }
