import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import homeRoutes from './routes/home';
import usuarioRoutes from './routes/usuario';


dotenv.config();
import pool from './config/dbConfig';

class App {
  // Inicializa a aplicação
  // Define os middlewares e as rotas
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Permite que a aplicação receba requisições em JSON
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    // Define as rotas da aplicação
    this.app.use('/', homeRoutes);
    this.app.use('/usuario/', usuarioRoutes);
  }
}

export default new App().app;
