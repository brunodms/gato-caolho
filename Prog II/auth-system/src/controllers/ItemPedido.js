import pool from '../config/dbConfig';
//const pool = require('../config/dbConfig');

class ItemPedidoController {
  // Rota de teste para verificar se a API está funcionando
  async index(req, res) {
    try {
      const result = await pool.query('SELECT * FROM item_pedido');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  }
}

export default new ItemPedidoController();
