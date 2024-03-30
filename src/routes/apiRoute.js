import usersRouter from './usersRoute.js';
import express from 'express';
import route from './route.json' assert { type: 'json' };

const apiRoute = express.Router();

apiRoute.use(route.USERS, usersRouter);

export default apiRoute;
