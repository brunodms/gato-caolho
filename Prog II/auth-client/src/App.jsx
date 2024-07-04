import { useState } from 'react'
import './App.css'
import postLogin from './service/postLogin'
import getUsuario from './service/getUsuario'

function App() {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  })

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: formData.email,
      senha: formData.senha
    }

    try {
      const response = await postLogin(data);
      console.log(response);
    } catch (error) {
      console.log('erro ao logar', error);
    }
  }

  const handleClick = async () => {
    const response = await getUsuario();
    console.log(response);
  }

  return (
    <main>
      <form onSubmit = {handleSubmit}>
        <input name='email' placeholder='email' type='email' value={formData.email} onChange={handleChange}/>
        <input name='senha' placeholder='senha' type='password' value={formData.senha} onChange={handleChange}/>
        <button type='submit'>login</button>
      </form>
      
      <button type='button' onClick={handleClick}>trazer usuarios</button>
    </main>
  )
}

export default App
