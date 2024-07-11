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
      const { nome, cpf, senha, email, telefone, id_cargo, status, data_admissao } = req.body;

      if (!validarCPF(cpf)) {
        return res.status(400).json({ message: 'CPF inválido.' });
      } else if (!validarEmail(email)) {
        return res.status(400).json({ message: 'Email inválido.' });
      } else if (!validarSenha(senha)) {
        return res.status(400).json({ message: 'Senha inválida.' });
      } else if (!validarTelefone(telefone)) {
        return res.status(400).json({ message: 'Telefone inválido.' });
      }

      let userExistente = await pool.query('SELECT * FROM usuario WHERE cpf = $1', [cpf]);
      if (userExistente.rows.length > 0) {
        return res.status(400).json({ message: 'CPF informado já possui registro.' });
      }

      userExistente = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
      if (userExistente.rows.length > 0) {
        return res.status(400).json({ message: 'E-mail informado já possui registro.' });
      }

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
  
      await pool.query(updateQuery, [nome, cpf, senha ? hashedPassword : userResult.rows[0].senha, email, telefone, id_cargo, data_admissao, status, id]);
  
      res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro no servidor');
    }
  }

  async desativa_usuario(req, res) {
    try {
      const { id } = req.params;
  
      const updateQuery = `
        UPDATE usuario 
        SET status = false
        WHERE id_usuario = $1
      `;
  
      await pool.query(updateQuery, [id]);
  
      res.status(200).json({ message: 'Usuário desativado com sucesso!' });
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

  async createUsuario(req, res) {
    try {
        const { nome, cpf, senha, email, telefone, id_cargo, data_admissao } = req.body;
        console.log(`nome = ${nome}, cpf = ${cpf}, senha = ${senha}, email = ${email}, telefone = ${telefone}, id_cargo = ${id_cargo}, data_admissao = ${data_admissao}`);

        if (!validarCPF(cpf)) {
          return res.status(400).json({ message: 'CPF inválido.' });
        } else if (!validarEmail(email)) {
          return res.status(400).json({ message: 'Email inválido.' });
        } else if (!validarSenha(senha)) {
          return res.status(400).json({ message: 'Senha inválida.' });
        } else if (!validarTelefone(telefone)) {
          return res.status(400).json({ message: 'Telefone inválido.' });
        }

        let userExistente = await pool.query('SELECT * FROM usuario WHERE cpf = $1', [cpf]);
        if (userExistente.rows.length > 0) {
          return res.status(400).json({ message: 'CPF informado já possui registro.' });
        }

        userExistente = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
        if (userExistente.rows.length > 0) {
          return res.status(400).json({ message: 'E-mail informado já possui registro.' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        await pool.query('INSERT INTO usuario (nome, cpf, senha, email, telefone, id_cargo, data_admissao) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nome, cpf, hashedPassword, email, telefone, id_cargo, data_admissao]);
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

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g,'');
  if (cpf.length !== 11) return false;

  let sum = 0;
  let remainder;
  for (let i=1; i<=9; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
  remainder = (sum * 10) % 11;

  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
  remainder = (sum * 10) % 11;

  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validarSenha(senha) {
  const minLength = 3;
  const maxLength = 8;
  
  if (senha.length + 1 < minLength) {
    return { isValid: false, message: 'A senha deve ter pelo menos 3 caracteres.' };
  } else if (senha.length > maxLength) {
    return { isValid: false, message: 'A senha deve ter pelo menos 8 caracteres.' };
  }

  return { isValid: true };
}

function validarTelefone(telefone) {
  // formato do telefone (ex: (XX) XXXXX-XXXX )
  const re = /^(?:\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;
  return re.test(telefone);
}

export default new UsuarioController();
