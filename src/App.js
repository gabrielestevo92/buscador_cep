import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {
  let e = '';
  const [input, setInput] = useState('')
  const [cep, setCep] = useState('');
  async function handleSearch(){
    // 58074107/json/
    if (input === ''){
      alert("Preencha com algum CEP!")
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      if (response.data.erro != true){setCep(response.data)}
      else{
        window.location = "app.js";
        alert("Erro! CEP não encontrado...")
    }
      setInput("");
    }catch{
      
      alert("Erro!");      
      setInput("")
      
      

    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>
      <div>
        {/* {cep.erro == true && (document.getElementsByClassName("main").style.display = 'none')} */}
      
        {Object.keys(cep).length > 0 && (
         
          <main className='main'>
          <h2>CEP: {cep.cep}</h2>
          
          <span className="span">{cep.logradouro}</span>
          {Object.keys(cep.complemento).length > 0 && (
            <span>Complemento: {cep.complemento}</span>
          )}
          
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
          </main>
          
       


        )}
        
        
        
      </div>
    </div>
  );
}

export default App;
