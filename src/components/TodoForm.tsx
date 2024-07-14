import React, { useState } from 'react';

interface TodoFormProps {
    addTodo: (todo: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addTodo(value);

        setValue("");
    };

    return (
        <form className="TodoForm" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                value={value}
                placeholder="Qual a tarefa de hoje?"
                onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit" className="todo-btn">+</button>
        </form>
    );
};
