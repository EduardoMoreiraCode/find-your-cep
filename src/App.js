import {useState} from 'react';
import {FiSearch} from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState(''); //input = o que eu tenho, setInput func p/ no que
  //eu quero transformar, useState o que é exibido

  const [cep, setCep] = useState({});


  const handleKeyDown = (evento) => {
    if(evento.key === "Enter")
    {
      handleSearch();
    }
  };

  async function handleSearch() {
    //13412090/json

    if(input === ''){
      alert('Insira algum cep!');
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data); //.data é p pegar os dados de cep, (da propria api)
      setInput("");
    } catch{
      alert("Ops, erro na busca! \nInsira um cep válido");
      setInput("");
    }

  }

  return (
    <div className="container">
      <h1 className="title">Encontre seu CEP</h1>

      <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onKeyDown={handleKeyDown}
        onChange={(e) => setInput(e.target.value)}//e.target.value: pega o que foi digitado e passa
        //para o input
        //e = event
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color='#FFF' />
        </button>
      </div>


      {Object.keys(cep).length > 0 && ( //(o que retorna) só retorna se
      //o tamanho do cep for maior que 0, se real tiver algo digitado
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          {Object.keys(cep.complemento).length > 0 && (
            //60170021 exemplo cep com complemento
            //so mostra o complemento se tiver complemento
            <span>Complemento: {cep.complemento}</span>
          )}
          {Object.keys(cep.bairro).length > 0 && (
            // so mostra o bairro se tiver bairro
            <span>Bairro: {cep.bairro}</span>
          )}
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;
