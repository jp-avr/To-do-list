import { useState, useEffect } from 'react';
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
    createdAt: number;
}

interface TodoWrapperProps {
    corAtual: string;
    setCorAtual: (color: string) => void;
}

const TodoWrapper: React.FC<TodoWrapperProps> = ({ corAtual }) => {
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
        const newTodo: Todo = { id: uuidv4(), tarefa, description, completed: false, completedAt: null, isEditing: false, createdAt: Date.now() };
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
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : { ...todo, isEditing: false }
            );
            salvar(updatedTodos);
            return updatedTodos;
        });
    };

    const editTarefa = (tarefa: string, description: string, id: string) => {
        setTodos(prevTodos => {
            const updatedTodos = prevTodos.map(todo =>
                todo.id === id ? { ...todo, tarefa, description, isEditing: false } : todo
            );
            salvar(updatedTodos);
            return updatedTodos;
        });
    };

    const orderByCreation = () => {
        const sortedTodos = [...todos].sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
        setTodos(sortedTodos);
    };

    const orderAlphabetically = () => {
        setTodos(prevTodos => [...prevTodos].sort((a, b) => a.tarefa.localeCompare(b.tarefa)));
    };

    return (
        <div className='TodoWrapper'>
            <h1>Minhas tarefas</h1>
            <TodoForm 
                addTodo={addTodo} 
                orderByCreation={orderByCreation} 
                orderAlphabetically={orderAlphabetically} 
                corAtual={corAtual}
            />
            {todos.map((todo) => (
                todo.isEditing ? (
                    <EditTodoForm
                        key={todo.id}
                        tarefa={todo}
                        editarTarefa={editTarefa}
                        onCancel={() => editarTarefa(todo.id)}
                    />
                ) : (
                    <Todo
                        key={todo.id}
                        tarefa={todo}
                        tarefaCompleta={tarefaCompleta}
                        deletarTarefa={deletarTarefa}
                        editarTarefa={editarTarefa}
                        corFundo={corAtual} // Passa a cor atual como propriedade para Todo
                    />
                )
            ))}
        </div>
    );
};

export default TodoWrapper;
