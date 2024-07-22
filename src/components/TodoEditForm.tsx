import { useState } from 'react';

interface EditTodoFormProps {
    editarTarefa: (tarefa: string, description: string, id: string) => void;
    tarefa: {
        id: string;
        tarefa: string;
        description: string;
    };
    onCancel: () => void; // Adicionamos uma propriedade onCancel
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({ editarTarefa, tarefa, onCancel }) => {
    const [value, setValue] = useState(tarefa.tarefa);
    const [description, setDescription] = useState(tarefa.description);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        editarTarefa(value, description, tarefa.id);

        setValue("");
        setDescription("");
    };

    const handleCancel = () => {
        onCancel(); // Chama a função onCancel para fechar o formulário
    };

    return (
        <form className="ToDoForm" onSubmit={handleSubmit}>
            <div>
                <input type="text" className="todo-input" value={value} placeholder="Atualizar Tarefa" onChange={(e) => setValue(e.target.value)}/>
                <textarea className="todo-input" value={description} placeholder="Atualizar Descrição" onChange={(e) => setDescription(e.target.value)}/> 
            </div>
            <div className="botoes">
                <button type="submit" className="todo-btn">Atualizar</button>
                <button type="button" onClick={handleCancel} className="todo-btn-cancelar">Cancelar</button>
            </div>
        </form>
    );
};
