import { Router } from 'express';
import formapagamentoController from '../controllers/FormaPagamento';

const routes = new Router();

routes.get('/', formapagamentoController.index);

export default routes;
