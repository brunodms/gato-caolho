import jwt from 'jsonwebtoken';
import pool from '../config/dbConfig';

const loginRequired = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id } = decoded;

    // Consulta ao banco para verificar se o usuário existe
    const query = 'SELECT * FROM usuario WHERE id_usuario = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        errors: ['Invalid user, please login again'],
      });
    }

    // Adiciona o id do usuário ao objeto de requisição para uso posterior
    req.userId = id;
    return next();
  } catch (error) {
    return res.status(401).json({
      errors: ['Token expired or invalid'],
    });
  }
};

export default loginRequired;
