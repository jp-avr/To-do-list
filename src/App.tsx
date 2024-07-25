import './App.css';
import TodoWrapper from './components/ToDoWrapper';
import { useState, useEffect } from 'react';

function App() {
    const [corAtual, setCorAtual] = useState<string>('');

    //ASSOCIANDO AS CORES COM AS RESPECTIVAS IMAGENS
    const imagensPorCor: Record<string, string> = {
        '#ADBDDC': 'src/assets/blue-note.png',
        '#FE9595': 'src/assets/pink-note.png',
        '#C7ADDC': 'src/assets/purple-note.png',
        '#FCB890': 'src/assets/orange-note.png',
        '#FFE3A7': 'src/assets/yellow-note.png',
    };

    const imagemAtual = imagensPorCor[corAtual] || 'src/assets/orange-note.png'; // orange-note.png é usada como imagem padrão

    useEffect(() => {
        // Atualiza o estilo do body ao mudar a cor atual
        document.body.style.backgroundColor = corAtual;
    }, [corAtual]);

    return (
        <div className="App" style={{ backgroundColor: corAtual }}>
            <div>
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
