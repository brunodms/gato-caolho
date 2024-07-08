import { Router } from 'express';
import cargoController from '../controllers/Cargo';

const routes = new Router();

routes.get('/', cargoController.index);

export default routes;
