import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faPlus, faArrowDownShortWide } from '@fortawesome/free-solid-svg-icons';

interface TodoFormProps {
    addTodo: (todo: string, description: string) => void;
    orderByCreation: () => void;
    orderAlphabetically: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ addTodo, orderByCreation, orderAlphabetically }) => {
    const [showForm, setShowForm] = useState(false);
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTodo(task, description);
        setTask("");
        setDescription("");
        setShowForm(false);
    };

    const handleOrderByCreation = () => {
        orderByCreation();
    };

    const handleOrderAlphabetically = () => {
        orderAlphabetically();
    };

    if (!showForm) {
        return (
            <div>
                <button onClick={() => setShowForm(true)} className='todo-filter space'><FontAwesomeIcon icon={faPlus} /></button>
                
                <button onClick={handleOrderAlphabetically} className='todo-filter space'><FontAwesomeIcon icon={faFilter} /></button> 

                <button onClick={handleOrderByCreation} className='todo-filter space'><FontAwesomeIcon icon={faArrowDownShortWide} /></button> 
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className='TodoForm'>
            <div>
                <input type="text" className='todo-input' value={task} placeholder="Qual a tarefa?" onChange={(e) => setTask(e.target.value)}/>
            </div>
            <div>
                <textarea value={description} className='todo-input' placeholder="Descrição da tarefa" onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className='botoes'>
                <button type="submit" className='todo-btn'>Adicionar Tarefa</button>
                <button onClick={() => setShowForm(false)} className='todo-btn-cancelar'>Cancelar</button>
            </div>
        </form>
    );
};
