import dotenv from 'dotenv';
import app from './app';

dotenv.config();

// Porta que o servidor irá escutar
const port = process.env.PORT;

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port} 🚀`);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
  console.log('DB_PORT:', process.env.DB_PORT);
});
