import './App.css';
import TodoWrapper from './components/ToDoWrapper';

function App() {
    return (
        <div className="App">
            <div className="cores">
                <div className="retangulo-azul"></div>
                <div className="retangulo-rosa"></div>
                <div className="retangulo-roxo"></div>
                <div className="retangulo-laranja"></div>
                <div className="retangulo-amarelo"></div>
            </div>
            <TodoWrapper></TodoWrapper>
        </div>
    );
}

export default App;
