import React from 'react';
import './App.css';
import Axios from 'axios'
import { useState } from 'react';
import { useEffect } from 'react';
function App() {
 
  const[nomeProduto, setnomeProduto] = useState('')
  const[precoProduto, setprecoProduto] = useState('')
  const[descricaoProduto, setdescricaoProduto] = useState('')
  const[quantidade, setquantidadeProduto] = useState('')
  const[listaProdutos, setlistaProdutos] = useState([])
  
  const[novaQuantidade, setnovaQuantidade] = useState("")
  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setlistaProdutos(response.data)
    }); 
  }, [])
  const enviarProduto = () =>{
    Axios.post("http://localhost:3001/api/insert",{
      nomeProduto: nomeProduto, precoProduto: precoProduto, descricaoProduto: descricaoProduto, quantidade: quantidade
    });
  
    setlistaProdutos([...listaProdutos, {nomeProduto: nomeProduto, precoProduto: precoProduto, descricaoProduto: descricaoProduto, quantidade: quantidade}]);
  }
  const apagarProduto = (nome) => {
    Axios.delete(`http://localhost:3001/api/delete/${nome}`, nomeProduto)
  }
  const atualizarProduto  = (nome) => {
    Axios.put("http://localhost:3001/api/update",{
      nomeProduto: nome, 
      quantidade: novaQuantidade,
      
    });
    setnovaQuantidade("");
    
  };
  
  
   return <div className = "App">
     <h1>Loja Eletro Mania</h1>
     <h2>Seja bem vindo a pagina de controle de estoque</h2>
     <h2>Cadastro de produto</h2>
  <div className = "form">
  <label>Nome do produto</label>
  <input 
    type = "text" 
    name = "nomeProduto"
    onChange = {(e) => {
     setnomeProduto(e.target.value); 
    }}
      />
  <label>Preço</label>
  <input 
    type = "text" 
    name = "precoProduto"
    onChange = {(e) => {
    setprecoProduto(e.target.value); 
    }}/>
  <label>Descrição</label>
  <input   
    type = "text" 
    name = "descricaoProduto"
    onChange = {(e) => {
    setdescricaoProduto(e.target.value);
    }}
    
   />
   <label>Quantidade</label>
  <input   
    type = "text" 
    name = "quantidade"
    onChange = {(e) => {
    setquantidadeProduto(e.target.value);
    }}
    />
  <button onClick = {enviarProduto}>Enviar</button>
  <h2>Seguem os produtos cadastrados: </h2>
  {listaProdutos.map((value)=>{
   return <div className = "produto">
       <h1> {value.nomeProduto}  </h1>
       <h2> {value.precoProduto} </h2>
       <p> {value.descricaoProduto}   </p>
       <p> {value.QUANTIDADE}   </p>
        <button onClick = {() => apagarProduto(value.nomeProduto)}>Apagar</button>
       
       
       <input type = "text" id= "updateInput" onChange={(e) =>{
        setnovaQuantidade(e.target.value);
       }}/>
       <button onClick={()=> atualizarProduto(value.nomeProduto)}>Alterar quantidade</button> 
       
  </div>
  })}
  </div>





  </div>
  
}

export default App;

