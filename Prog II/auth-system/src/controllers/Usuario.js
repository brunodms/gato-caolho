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
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Verifique suas credenciais e tente novamente.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  }

  async create(req, res) {
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
}

export default new UsuarioController();
