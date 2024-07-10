import { Router } from 'express';
import produtoController from '../controllers/Produto';

const routes = new Router();

routes.get('/', produtoController.index);
routes.post('/create', produtoController.create_produto);
routes.put('/update/:id', produtoController.update_produto);
routes.delete('/delete/:id', produtoController.delete_produto);
routes.get('/:id', produtoController.get_produto_by_id);

export default routes;