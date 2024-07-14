import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface TodoProps {
    tarefa: {
        id: string;
        tarefa: string;
        completed: boolean;
    };
    tarefaCompleta: (id: string) => void;
    deletarTarefa: (id: string) => void;
    editarTarefa: (id: string) => void;
}

export const Todo: React.FC<TodoProps> = ({ tarefa, tarefaCompleta, deletarTarefa, editarTarefa }) => {

    const handleCompleteClick = () => {
        tarefaCompleta(tarefa.id);
    }

    const handleEditClick = () => {
        editarTarefa(tarefa.id);
    }

    const handleDeleteClick = () => {
        deletarTarefa(tarefa.id);
    }

    return (
        <div className={`Todo ${tarefa.completed ? 'completed' : ''}`}>
            <p onClick={handleCompleteClick}>{tarefa.tarefa}</p>
            <div>
                <FontAwesomeIcon icon={faPenToSquare} onClick={handleEditClick} />
                <FontAwesomeIcon icon={faTrash} onClick={handleDeleteClick} />
            </div>
        </div>
    )
};

export default Todo;