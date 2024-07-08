import { Router } from 'express';
import secaoController from '../controllers/Secao';

const routes = new Router();

routes.get('/', secaoController.index);

export default routes;
