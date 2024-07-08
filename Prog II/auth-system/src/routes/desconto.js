import { Router } from 'express';
import descontoController from '../controllers/Desconto';

const routes = new Router();

routes.get('/', descontoController.index);

export default routes;
