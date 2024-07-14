import { useEffect, useState } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './TodoEditForm';

interface Todo {
    id: string;
    tarefa: string;
    completed: boolean;
    isEditing: boolean;
}

export default function TodoWrapper(){
    const localStorageKey = 'todos';
    const [todos, setTodos] = useState<Todo[]>([]);

    //FUNÇÃO PARA TRAZER OS VALORES DO LOCAL STORAGE DE VOLTA
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(localStorageKey) || '[]') as Todo[];
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []); 

    // Função para salvar no localStorage
    const salvar = (updatedTodos: Todo[]) => {
        localStorage.setItem(localStorageKey, JSON.stringify(updatedTodos));
    };

    const addTodo = (todo: string) => {
        const newTodo: Todo = { id: uuidv4(), tarefa: todo, completed: false, isEditing: false };
        setTodos(prevTodos => {
            const updatedTodos = [...prevTodos, newTodo];
            salvar(updatedTodos); // Salva com os todos atualizados
            return updatedTodos;
        });
    };

    const tarefaCompleta = (id: string) => {
        setTodos(prevTodos => {
            const updatedTodos = prevTodos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            salvar(updatedTodos); // Salva com os todos atualizados
            return updatedTodos;
        });
    };

    const deletarTarefa = (id: string) => {
        setTodos(prevTodos => {
            const updatedTodos = prevTodos.filter(todo =>
                todo.id !== id
            );
            salvar(updatedTodos); // Salva com os todos atualizados
            return updatedTodos;
        });
    };

    const editarTarefa = (id: string) => {
        setTodos(prevTodos => {
            const updatedTodos = prevTodos.map(todo =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            );
            salvar(updatedTodos); // Salva com os todos atualizados
            return updatedTodos;
        });
    };

    const editTarefa = (tarefa: string, id: string) => {
        setTodos(prevTodos => {
            const updatedTodos = prevTodos.map(todo =>
                todo.id === id ? { ...todo, tarefa, isEditing: !todo.isEditing } : todo
            );
            salvar(updatedTodos); // Salva com os todos atualizados
            return updatedTodos;
        });
    };


    return (
        <div className='TodoWrapper'>
            <h1>Minhas tarefas</h1>
            <TodoForm addTodo={addTodo}></TodoForm>

            {/* Esse trecho de código serve para mapear o que foi enviado na nossa task para adicionar o card */}
            {todos.map((todo) => (
                todo.isEditing ? (
                    <EditTodoForm editarTarefa={editTarefa} tarefa={todo} key={todo.id}></EditTodoForm>
                ) : (
                    <Todo
                        key={todo.id}
                        tarefa={todo}
                        tarefaCompleta={tarefaCompleta}
                        deletarTarefa={deletarTarefa}
                        editarTarefa={editarTarefa}
                    ></Todo>
                )
            ))}
        </div>
    )
};
