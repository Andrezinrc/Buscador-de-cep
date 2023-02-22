import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "./api";


import './style.css';

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
      alert("ops erro buscar")
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="titulo">buscador CEP</h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite o CEP" value={input} onChange={(event) => setInput(event.target.value)} />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
          <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}
      
    </div>
  );
}

export default App;
