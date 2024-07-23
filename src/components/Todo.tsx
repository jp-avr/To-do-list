import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

interface TodoProps {
    tarefa: {
        id: string;
        tarefa: string;
        description: string;
        completed: boolean;
        completedAt?: Date | null;
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
            <div>
                <FontAwesomeIcon icon={faCircleCheck} onClick={handleCompleteClick} />
            </div>

            <div>
                <p onClick={handleCompleteClick}>{tarefa.tarefa}</p>
                <p> Descrição: {tarefa.description}</p>
                            {tarefa.completed && tarefa.completedAt && (
                <p>Completo em {new Date(tarefa.completedAt).toLocaleDateString()}</p>
            )}
            </div>

            <div>
                <FontAwesomeIcon icon={faPenToSquare} onClick={handleEditClick} />
                <FontAwesomeIcon icon={faTrash} onClick={handleDeleteClick} />
            </div>
        </div>
    )
};

export default Todo;
