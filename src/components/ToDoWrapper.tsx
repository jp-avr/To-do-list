import { useEffect, useState } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './TodoEditForm';

interface Todo {
    id: string;
    tarefa: string;
    description: string;
    completed: boolean;
    completedAt?: Date | null;
    isEditing: boolean;
}

export default function TodoWrapper() {
    const localStorageKey = 'todos';
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(localStorageKey) || '[]') as Todo[];
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    const salvar = (updatedTodos: Todo[]) => {
        localStorage.setItem(localStorageKey, JSON.stringify(updatedTodos));
    };

    const addTodo = (tarefa: string, description: string) => {
        const newTodo: Todo = { id: uuidv4(), tarefa, description, completed: false, completedAt: null, isEditing: false };
        setTodos(prevTodos => {
            const updatedTodos = [...prevTodos, newTodo];
            salvar(updatedTodos);
            return updatedTodos;
        });
    };

    const tarefaCompleta = (id: string) => {
        setTodos(prevTodos => {
            const updatedTodos = prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date() : null } : todo
            );
            salvar(updatedTodos);
            return updatedTodos;
        });
    };

    const deletarTarefa = (id: string) => {
        setTodos(prevTodos => {
            const updatedTodos = prevTodos.filter(todo =>
                todo.id !== id
            );
            salvar(updatedTodos);
            return updatedTodos;
        });
    };

    const editarTarefa = (id: string) => {
        setTodos(prevTodos => {
            const updatedTodos = prevTodos.map(todo =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            );
            salvar(updatedTodos);
            return updatedTodos;
        });
    };

    const editTarefa = (tarefa: string, description: string, id: string) => {
        setTodos(prevTodos => {
            const updatedTodos = prevTodos.map(todo =>
                todo.id === id ? { ...todo, tarefa, description, isEditing: !todo.isEditing } : todo
            );
            salvar(updatedTodos);
            return updatedTodos;
        });
    };

    const cancelEdit = () => {
        setTodos(prevTodos => prevTodos.map(todo => ({ ...todo, isEditing: false })));
    };

    return (
        <div className='TodoWrapper'>
            <h1>Minhas tarefas</h1>
            <TodoForm addTodo={addTodo}></TodoForm>
            {todos.map((todo) => (
                todo.isEditing ? (
                    <EditTodoForm
                        key={todo.id}
                        tarefa={todo}
                        editarTarefa={editTarefa}
                        onCancel={cancelEdit} // Passa a função cancelEdit para o EditTodoForm
                    />
                ) : (
                    <Todo
                        key={todo.id}
                        tarefa={todo}
                        tarefaCompleta={tarefaCompleta}
                        deletarTarefa={deletarTarefa}
                        editarTarefa={editarTarefa}
                    />
                )
            ))}
        </div>
    );
}
