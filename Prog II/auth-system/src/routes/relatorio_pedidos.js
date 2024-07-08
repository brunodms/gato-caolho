import { Router } from 'express';
import pedidoController from '../controllers/Pedido';

const routes = new Router();

routes.get('/', pedidoController.relatorio_pedidos);

export default routes;
