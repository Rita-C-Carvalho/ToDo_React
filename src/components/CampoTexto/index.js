import React, { useState } from 'react';
import './CampoTexto.css';


//Define o componente CampoTexto como uma função que recebe a props onEnter e retorna um input
const CampoTexto = ({ onEnter }) => {

  /*Declara o estado valor usando o hook useState e o inicializa com uma string vazia. 
  SetValor é a função que atualiza o estado valor*/
  const [valor, setValor] = useState('');

  /*Define a função handleChange que é chamada quando o valor input é alterado.
  Recebe o objeto event como parametro, que contém informações sobre o evento de mudança.
  Atualiza o estado valor com o valor atual do input usando event.target.value */
  const handleChange = (event) => {
    setValor(event.target.value);
  };
  
  /* Define a função handleKeyPress que é chamada quando uma tecla é pressionada no input.
     Recebe o objeto event como parâmetro, que contém informações sobre o evento de tecla pressionada.
     Verifica se a tecla pressionada é a tecla "Enter" usando event.key === 'Enter'.
     Se for a tecla "Enter":
        Chama event.preventDefault() para evitar o comportamento padrão de envio do formulário.
        Chama a função onEnter passando o valor atual do input (valor) como argumento.
        Limpa o estado valor definindo-o como uma string vazia usando setValor('').*/
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onEnter(valor);
      setValor('');
    }
  };

  /*Retorna o JSX que representa a estrutura do componente.
    Renderiza um elemento <div> com a classe CSS "campo-texto".
    Dentro do <div>, renderiza um elemento <input> do tipo "text" com os seguintes atributos:
        placeholder: Define o texto de placeholder exibido quando o input está vazio.
        value: Define o valor do input como o estado valor.
        onChange: Define a função handleChange como o manipulador de evento para quando o valor do input 
        é alterado.
        onKeyPress: Define a função handleKeyPress como o manipulador de evento para quando uma tecla é 
        pressionada no input. */
  return (
    <div className="campo-texto">
      <input
        type="text"
        placeholder="O que precisa ser feito?"
        value={valor}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default CampoTexto;