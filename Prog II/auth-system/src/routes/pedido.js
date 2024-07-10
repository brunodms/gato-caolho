import { Router } from 'express';
import pedidoController from '../controllers/Pedido';

const routes = new Router();

routes.get('/', pedidoController.index);
routes.get('/relatorio_pedidos', pedidoController.relatorio_pedidos);

export default routes;
