import { Router } from 'express';
import itempedidoController from '../controllers/ItemPedido';

const routes = new Router();

routes.get('/', itempedidoController.index);

export default routes;
