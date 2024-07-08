import { Router } from 'express';
import pedidoController from '../controllers/Pedido';

const routes = new Router();

routes.get('/', pedidoController.index);

export default routes;
