import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css';
import api from './api.js';

function App() {

  const [input, setInput] = useState('');
  const  [cep, setCep] =  useState({});

  async function handleSearch(){
    if(input === ''){
      alert("preencha algum CEP");
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      console.log(response.data)
      setCep(response.data)
      setInput('')

    }catch{
      alert("ops erro ao buscar")
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="titulo">buscador CEP</h1>

     <div div className="containerInput">
        <input type="text" placeholder="Digite o CEP" value={input} onChange={(event) => setInput(event.target.value)} />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
          <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>
        </main>
      )}
      
    </div>
  )
}
export default App;
