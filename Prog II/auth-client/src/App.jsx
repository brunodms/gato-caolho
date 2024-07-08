import { useState } from 'react'
import './App.css'

// POSTs e GETs mais elaborados
import postLogin from './service/postLogin'
import getRelatorioPedidos from './service/getRelatorioPedidos'

// GETs Básicos
import getUsuario from './service/getUsuario'
import getPedido from './service/getPedido'
import getItemPedido from './service/getItemPedido'
import getProduto from './service/getProduto'
import getComanda from './service/getComanda'
import getCargo from './service/getCargo'
import getFormaPagamento from './service/getFormaPagamento'
import getDesconto from './service/getDesconto'
import getSecao from './service/getSecao'
import getVenda from './service/getVenda'

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

  const handleClickUsuario = async () => {
    const response = await getUsuario();
    console.log(response);
  }

  const handleClickPedido = async () => {
    const response = await getPedido();
    console.log(response);
  }

  const handleClickItensPedidos = async () => {
    const response = await getItemPedido();
    console.log(response);
  }

  const handleClickComanda = async () => {
    const response = await getComanda();
    console.log(response);
  }

  const handleClickCargo = async () => {
    const response = await getCargo();
    console.log(response);
  }

  const handleClickProduto = async () => {
    const response = await getProduto();
    console.log(response);
  }

  const handleClickFormaPagamento = async () => {
    const response = await getFormaPagamento();
    console.log(response);
  }

  const handleClickDesconto = async () => {
    const response = await getDesconto();
    console.log(response);
  }

  const handleClickSecao = async () => {
    const response = await getSecao();
    console.log(response);
  }

  const handleClickVenda = async () => {
    const response = await getVenda();
    console.log(response);
  }

  const handleClickRelatorioPedido = async () => {
    const response = await getRelatorioPedidos();
    console.log(response);
  }

  return (
    <main>
      <form onSubmit = {handleSubmit}>
        <input name='email' placeholder='email' type='email' value={formData.email} onChange={handleChange}/>
        <input name='senha' placeholder='senha' type='password' value={formData.senha} onChange={handleChange}/>
        <button type='submit'>login</button>
      </form>
      
      <br></br>
      <button type='button' onClick={handleClickUsuario}>trazer usuarios</button>
      <button type='button' onClick={handleClickPedido}>trazer pedidos</button>
      <button type='button' onClick={handleClickItensPedidos}>trazer itens pedidos</button>
      <button type='button' onClick={handleClickProduto}>trazer Produto</button>
      <button type='button' onClick={handleClickComanda}>trazer comandas</button>
      <button type='button' onClick={handleClickCargo}>trazer cargos</button>
      <button type='button' onClick={handleClickFormaPagamento}>trazer formas de pagamento</button>
      <button type='button' onClick={handleClickDesconto}>trazer desconto</button>
      <button type='button' onClick={handleClickSecao}>trazer seções</button>
      <button type='button' onClick={handleClickVenda}>trazer Vendas</button>

      <br></br>
      <button type='button' onClick={handleClickRelatorioPedido}>Relatório de pedidos dos clientes com o nome dos itens pedidos</button>
    </main>
  )
}

export default App
