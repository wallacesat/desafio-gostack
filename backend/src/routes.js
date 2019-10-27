import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetupController from './app/controllers/MeetupController';
import InscriptionController from './app/controllers/InscriptionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.put('/files/:id', upload.single('file'), FileController.update);

routes.post('/meetups', MeetupController.store);
routes.get('/meetups', MeetupController.index);
routes.get('/meetups/my-meetups', MeetupController.listMyMeetups);
routes.put('/meetups/:id', MeetupController.update);
routes.delete('/meetups/:id', MeetupController.delete);

routes.post('/inscriptions/:id', InscriptionController.store);
routes.delete('/inscriptions/:id', InscriptionController.delete);
routes.get('/inscriptions', InscriptionController.index);

export default routes;
