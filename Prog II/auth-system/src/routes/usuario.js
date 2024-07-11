import { Router } from 'express';
import usuarioController from '../controllers/Usuario';
import loginRequired from '../middlewares/loginRequired';

const routes = new Router();

// Rota para a página inicial da API
routes.get('/usuario', loginRequired, usuarioController.index);
routes.get('/:id', loginRequired, usuarioController.getById);
routes.put('/update_usuario/:id', loginRequired, usuarioController.update_usuario);
routes.post('/login/', usuarioController.login);
routes.post('/register/', loginRequired, usuarioController.createUsuario);
routes.delete('/delete_usuario/:id', loginRequired, usuarioController.delete_usuario);

export default routes;
