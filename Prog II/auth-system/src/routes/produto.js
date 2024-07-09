import { Router } from 'express';
import produtoController from '../controllers/Produto';

const routes = new Router();

routes.get('/', produtoController.index);
routes.post('/create', produtoController.create);
routes.put('/update/:id', produtoController.update);
routes.delete('/delete/:id', produtoController.delete);
routes.get('/:id', produtoController.show);

export default routes;
