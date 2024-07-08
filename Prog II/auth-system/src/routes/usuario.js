import { Router } from 'express';
import usuarioController from '../controllers/Usuario';

const routes = new Router();

// Rota para a página inicial da API
routes.get('/', usuarioController.index);
routes.post('/login', usuarioController.login);
routes.post('/register', usuarioController.create);

export default routes;
