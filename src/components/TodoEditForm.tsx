import React, { useState } from 'react';

interface EditTodoFormProps {
    editarTarefa: (tarefa: string, id: string) => void;
    tarefa: {
        id: string;
        tarefa: string;
    };
}

export const EditTodoForm: React.FC<EditTodoFormProps> = ({ editarTarefa, tarefa }) => {
    const [value, setValue] = useState(tarefa.tarefa);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        editarTarefa(value, tarefa.id);

        setValue("");
    };

    return (
        <form className="ToDoForm" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                value={value}
                placeholder="Atualizar Tarefa"
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit" className="todo-btn">Atualizar</button>
        </form>
    );
};
