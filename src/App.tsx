import './App.css';
import TodoWrapper from './components/ToDoWrapper';
import { useState, useEffect } from 'react';

function App() {
    const [corAtual, setCorAtual] = useState<string>('');

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
                    <img className="imagem_note" src="src/assets/orange-note.png" alt="Bloco de notas colorido" />
                </div>

            </div>
            <TodoWrapper corAtual={corAtual} setCorAtual={setCorAtual} />
        </div>
    );
}

export default App;
