import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import homeRoutes from './routes/home';
import usuarioRoutes from './routes/usuario';
import pedidoRoutes from './routes/pedido';
import itempedidoRoutes from './routes/item_pedido';
import comandaRoutes from './routes/comanda';
import cargoRoutes from './routes/cargo';
import produtoRoutes from './routes/produto';
import formapagamentoRoutes from './routes/forma_pagamento';
import descontoRoutes from './routes/desconto';
import secaoRoutes from './routes/secao';
import vendaRoutes from './routes/venda';
import relatoriopedidosRoutes from './routes/relatorio_pedidos';

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
    this.app.use('/pedido/', pedidoRoutes);
    this.app.use('/item_pedido/', itempedidoRoutes);
    this.app.use('/comanda/', comandaRoutes);
    this.app.use('/cargo/', cargoRoutes);
    this.app.use('/produto/', produtoRoutes);
    this.app.use('/forma_pagamento/', formapagamentoRoutes);
    this.app.use('/desconto/', descontoRoutes);
    this.app.use('/secao/', secaoRoutes);
    this.app.use('/venda/', vendaRoutes);
    this.app.use('/relatorio_pedidos/', relatoriopedidosRoutes);
  }
}

export default new App().app;
