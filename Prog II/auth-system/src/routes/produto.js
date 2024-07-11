import { Router } from 'express';
import produtoController from '../controllers/Produto';
import loginRequired from '../middlewares/loginRequired';

const routes = new Router();

routes.get('/', loginRequired, produtoController.index);
routes.post('/create', loginRequired, produtoController.create_produto);
routes.put('/update/:id', loginRequired, produtoController.update_produto);
routes.delete('/delete/:id', loginRequired, produtoController.delete_produto);
routes.get('/:id', loginRequired, produtoController.get_produto_by_id);

export default routes;