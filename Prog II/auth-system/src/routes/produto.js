import { Router } from 'express';
import produtoController from '../controllers/Produto';

const routes = new Router();

routes.get('/', produtoController.index);

export default routes;
