import pool from '../config/dbConfig';
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
//const pool = require('../config/dbConfig');

class UsuarioController {
  // Rota de teste para verificar se a API está funcionando
  async index(req, res) {
    try {
      const result = await pool.query('SELECT * FROM usuario');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      res.status(200).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  }

  async update_usuario(req, res) {
    try {
      const { id } = req.params;
      const { nome, cpf, senha, email, telefone, id_cargo, status } = req.body;
      const dataAdmissao = new Date().toISOString().slice(0, 10);

      const userResult = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
  
      if (userResult.rows.length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  
      let hashedPassword;
      if (senha) {
        hashedPassword = await bcrypt.hash(senha, 10);
      }
  
      const updateQuery = `
        UPDATE usuario 
        SET nome = $1, cpf = $2, senha = COALESCE($3, senha), email = $4, telefone = $5, id_cargo = $6, data_admissao = $7, status = $8
        WHERE id_usuario = $9
      `;
  
      await pool.query(updateQuery, [nome, cpf, senha ? hashedPassword : userResult.rows[0].senha, email, telefone, id_cargo, dataAdmissao, status, id]);
  
      res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  }
  

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
      }

      const result = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);

      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Usuário não encontrado.' });
      }

      const user = result.rows[0];

      if (!user.senha) {
        return res.status(500).json({ message: 'Erro no servidor: senha do usuário não definida.' });
      }

      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (isPasswordValid) {
        const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, id_usuario: user.id_usuario });
      } else {
        res.status(401).json({ message: 'Verifique suas credenciais e tente novamente.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  }

  async create_cliente(req, res) {
    try {
        const { nome, cpf, senha, email, telefone } = req.body;
        const hashedPassword = await bcrypt.hash(senha, 10);
        await pool.query('INSERT INTO usuario (nome, cpf, senha, email, telefone, id_cargo) VALUES ($1, $2, $3, $4, $5, 3)', [nome, cpf, hashedPassword, email, telefone]);
        res.status(201).json({ message: 'Registro efetuado com sucesso!' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Erro ao registrar usuário.' });
    }
  }

  async create_funcionario(req, res) {
    try {
        const { nome, cpf, senha, email, telefone } = req.body;
        const hashedPassword = await bcrypt.hash(senha, 10);
        const dataAdmissao = new Date().toISOString().slice(0, 10);
        const status = true;
        await pool.query("INSERT INTO usuario (nome, cpf, senha, email, telefone, id_cargo, data_admissao, status) VALUES ($1, $2, $3, $4, $5, 2, $6, $7)", 
          [nome, cpf, hashedPassword, email, telefone, dataAdmissao, status]);
        res.status(201).json({ message: 'Registro efetuado com sucesso!' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Erro ao registrar usuário.' });
    }
  }

  async delete_usuario(req, res) {
    try {
        const { id } = req.params;

        const result = await pool.query("DELETE FROM usuario WHERE id_usuario = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json({ message: 'Usuário excluído com sucesso!' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'Erro ao excluir usuário.' });
    }
  }

}

export default new UsuarioController();
