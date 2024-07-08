import pool from '../config/dbConfig';
//const pool = require('../config/dbConfig');

class FormaPagamentoController {
  // Rota de teste para verificar se a API está funcionando
  async index(req, res) {
    try {
      const result = await pool.query('SELECT * FROM forma_pagamento');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  }
}

export default new FormaPagamentoController();
