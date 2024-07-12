import pool from '../config/dbConfig';

class ProdutoController {

  // Listar todos os produtos
  async index(req, res) {
    try {
      const result = await pool.query('SELECT * FROM produto');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  }

  // Criar novo produto
  async create_produto(req, res) {
    try {
      const { nome, descricao, valor, marca, unidade_medida, id_secao } = req.body;

      // Validações
      if (!nome || !descricao || !valor || !marca || !unidade_medida || !id_secao) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }
      if (typeof valor !== 'number' || valor <= 0) {
        return res.status(400).json({ message: 'O valor deve ser um número positivo.' });
      }

      const query = `
        INSERT INTO produto (nome, descricao, valor, marca, unidade_medida, id_secao)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;
      const values = [nome, descricao, valor, marca, unidade_medida, id_secao];
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Erro ao criar produto.' });
    }
  }

  // Atualizar produto
  async update_produto(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, valor, marca, unidade_medida, id_secao } = req.body;

      // Validações
      if (!nome || !descricao || !valor || !marca || !unidade_medida || !id_secao) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }
      if (typeof valor !== 'number' || valor <= 0) {
        return res.status(400).json({ message: 'O valor deve ser um número positivo.' });
      }

      const query = `
        UPDATE produto
        SET nome = $1, descricao = $2, valor = $3, marca = $4, unidade_medida = $5, id_secao = $6
        WHERE id_produto = $7
        RETURNING *`;
      const values = [nome, descricao, valor, marca, unidade_medida, id_secao, id];
      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Erro ao atualizar produto.' });
    }
  }

  // Deletar produto
  async delete_produto(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query('DELETE FROM produto WHERE id_produto = $1', [id]);

      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      res.status(200).json({ message: 'Produto excluído com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Erro ao excluir produto.' });
    }
  }

  // Buscar produto por id
  async get_produto_by_id(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM produto WHERE id_produto = $1', [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro no servidor');
    }
  }
}

export default new ProdutoController();