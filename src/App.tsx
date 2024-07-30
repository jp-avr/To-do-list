import './App.css';
import TodoWrapper from './components/ToDoWrapper';
import { useState, useEffect } from 'react';
import tempoAzul from './assets/tempo-azul.svg';
import alvoVermelho from './assets/alvo-vermelho.svg';
import tarefasRoxo from './assets/tarefas-roxo.svg';
import ideiaLaranja from './assets/ideia-laranja.svg';
import mensagemAmarelo from './assets/mensagem-amarelo.svg';

function App() {
    const [corAtual, setCorAtual] = useState<string>('');

    //ASSOCIANDO AS CORES COM AS RESPECTIVAS IMAGENS
    const imagensPorCor: Record<string, string> = {
        '#ADBDDC': tempoAzul,
        '#FE9595': alvoVermelho,
        '#C7ADDC': tarefasRoxo,
        '#FCB890': ideiaLaranja,
        '#FFE3A7': mensagemAmarelo,
    };

    const imagemAtual = imagensPorCor[corAtual] || ideiaLaranja; // ideia-laranja.svg é usada como imagem padrão

    useEffect(() => {
        // Atualiza o estilo do body ao mudar a cor atual
        document.body.style.backgroundColor = corAtual;
    }, [corAtual]);

    return (
        <div className="App" style={{ backgroundColor: corAtual }}>
            <div className="imagem_cor">
                <div className="cores">
                    <div className="retangulo-azul" onClick={() => setCorAtual('#ADBDDC')}></div>
                    <div className="retangulo-rosa" onClick={() => setCorAtual('#FE9595')}></div>
                    <div className="retangulo-roxo" onClick={() => setCorAtual('#C7ADDC')}></div>
                    <div className="retangulo-laranja" onClick={() => setCorAtual('#FCB890')}></div>
                    <div className="retangulo-amarelo" onClick={() => setCorAtual('#FFE3A7')}></div>
                </div>
                <div>
                    <img className="imagem_note" src={imagemAtual} alt="Bloco de notas colorido" />
                </div>
            </div>
            <TodoWrapper corAtual={corAtual} setCorAtual={setCorAtual} />
        </div>
    );
}

export default App;
