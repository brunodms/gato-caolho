import { Router } from 'express';
import comandaController from '../controllers/Comanda';

const routes = new Router();

routes.get('/', comandaController.index);

export default routes;
