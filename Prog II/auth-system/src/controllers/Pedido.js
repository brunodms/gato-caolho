import pool from '../config/dbConfig';
//const pool = require('../config/dbConfig');

class PedidoController {
  // Rota de teste para verificar se a API está funcionando
  async index(req, res) {
    try {
      const result = await pool.query('SELECT * FROM pedido');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  }

  async relatorio_pedidos(req, res) {
    try {
      const result = await pool.query("select pedido.id_pedido AS pedido, pedido.id_comanda AS comanda, usuario.nome AS cliente, usuario.cpf AS CPF, produto.nome AS produto FROM pedido JOIN item_pedido ON item_pedido.id_pedido = pedido.id_pedido JOIN usuario ON usuario.id_comanda = pedido.id_comanda JOIN produto ON produto.id_produto = item_pedido.id_produto");
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  }
}

export default new PedidoController();
