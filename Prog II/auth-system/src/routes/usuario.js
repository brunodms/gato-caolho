import { Router } from 'express';
import usuarioController from '../controllers/Usuario';

const routes = new Router();

// Rota para a página inicial da API
routes.get('/', usuarioController.index);
routes.get('/:id', usuarioController.getById);
routes.put('/update_usuario/:id', usuarioController.update_usuario);
routes.post('/login/', usuarioController.login);
routes.post('/register/', usuarioController.create_cliente);
routes.post('/register_funcionario/', usuarioController.create_funcionario);
routes.delete('/delete_usuario/:id', usuarioController.delete_usuario);

export default routes;
