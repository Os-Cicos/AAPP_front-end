// O componente Timer é responsável por exibir uma contagem regressiva em minutos e segundos.
// Ele aceita os seguintes parâmetros:
// - timeout: O tempo total da contagem regressiva em milissegundos.
// - start: Um booleano indicando se a contagem regressiva deve começar.

// Importação de bibliotecas e estilos necessários para o componente.
import React, { useState, useEffect } from 'react';
import './style.css';

// Declaração do componente funcional Timer.
export default function Timer({ timeout, start }) {
  // Estado local para rastrear o tempo decorrido.
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Efeito colateral para gerenciar a contagem regressiva.
  useEffect(() => {
    // Reinicia o tempo decorrido se a contagem não estiver ativa.
    if (!start) {
      setTimeElapsed(0);
      return;
    }

    // Se o tempo decorrido atingir ou ultrapassar o tempo limite, interrompe o intervalo.
    if (timeElapsed >= timeout) return;

    // Inicia um intervalo para incrementar o tempo decorrido a cada segundo.
    const intervalId = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1000);
    }, 1000);

    // Limpeza do intervalo quando o componente é desmontado ou a contagem é interrompida.
    return () => clearInterval(intervalId);
  }, [timeElapsed, timeout, start]);

  // Converte o tempo decorrido em minutos e segundos.
  const minutes = Math.floor(timeElapsed / 60000);
  const seconds = ((timeElapsed % 60000) / 1000).toFixed(0);

  // Renderização do componente.
  return (
    <div className='timer-container' style={{ display: `${start ? 'block' : 'none'}` }}>
      {/* Exibição do tempo no formato MM:SS. */}
      {minutes}:{seconds < 10 ? '0' : ''}{seconds}
    </div>
  );
}
