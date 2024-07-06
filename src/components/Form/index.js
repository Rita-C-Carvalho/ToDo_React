import React, { useState } from 'react';
import './Form.css';
import CampoTexto from '../CampoTexto';
import Botao from '../Botao';
import { CheckCircleTwoTone, Delete } from '@mui/icons-material';

const Formulario = () => {
  const [tarefas, setTarefas] = useState([]);
  const [exibirTarefas, setExibirTarefas] = useState('todas');

  const adicionarTarefa = (valor) => {
    if (valor.trim() !== '') {
      const novaTarefa = {
        id: tarefas.length + 1,
        texto: valor.trim(),
        concluida: false,
      };
      setTarefas([...tarefas, novaTarefa]);
    }
  };

  const removerTarefa = (id) => {
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(novasTarefas);
  };

  const marcarTarefaConcluida = (id) => {
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });
    setTarefas(novasTarefas);
  };

  const tarefasFiltradas = () => {
    switch (exibirTarefas) {
      case 'concluidas':
        return tarefas.filter((tarefa) => tarefa.concluida);
      case 'nao-concluidas':
        return tarefas.filter((tarefa) => !tarefa.concluida);
      default:
        return tarefas;
    }
  };

  const totalTarefas = tarefas.length;
  const totalTarefasConcluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

  return (
    <section className="formulario">
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="botoes-filtro">
            <Botao onClick={() => setExibirTarefas('todas')} className="botao-filtro">Todas</Botao>
            <Botao onClick={() => setExibirTarefas('concluidas')} className="botao-filtro">Tarefas concluídas</Botao>
            <Botao onClick={() => setTarefas([])} className="botao-filtro">Limpar todas</Botao>
            <Botao onClick={() => {
              setTarefas(tarefas.filter((tarefa) => !tarefa.concluida));
              setExibirTarefas('todas');
            }} className="botao-filtro">Limpar concluídas</Botao>  
        </div>
        <CampoTexto onEnter={adicionarTarefa} />

        <ul>
          {tarefasFiltradas().map((tarefa) => (
            <li
              key={tarefa.id}
              style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}
            >
              <span>{tarefa.texto}</span>
              <div>
                <Botao 
                  onClick={() => marcarTarefaConcluida(tarefa.id)}
                  className={tarefa.concluida ? 'botao-concluido' : ''}
                >
                  <CheckCircleTwoTone style={{ fontSize: '40px' }} className='check-icon' />
                </Botao>
                <Botao onClick={() => removerTarefa(tarefa.id)} className='botao-delete'>
                  <Delete style={{ fontSize: '40px' }} className='delete-icon' />
                </Botao>
              </div>
            </li>
          ))}
        </ul>
        <div className="contadores">
          <p>Total de tarefas: {totalTarefas}</p>
          <p>Tarefas concluídas: {totalTarefasConcluidas}</p>
        </div>
 
      </form>
    </section>
  );
};

export default Formulario;