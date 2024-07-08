import { Router } from 'express';
import vendaController from '../controllers/Venda';

const routes = new Router();

routes.get('/', vendaController.index);

export default routes;
