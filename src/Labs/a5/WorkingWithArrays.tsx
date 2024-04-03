import React, { useEffect, useState } from 'react';
import axios from 'axios';

function WorkingWithArrays() {
    const API = 'http://localhost:4000/a5/todos';
    const [todo, setTodo] = useState({
        id: 1,
        title: 'NodeJS Assignment',
        description: 'Create a NodeJS server with ExpressJS',
        due: '2021-09-09',
        completed: false,
    });
    // using axios
    const [todos, setTodos] = useState<any[]>([]);
    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };
    useEffect(() => {
        fetchTodos();
    }, []);

    const removeTodo = async (todo: any) => {
        const response = await axios.get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };
    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };
    const fetchTodoById = async (id: number) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };
    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };

    return (
        <div>
            <h3> Working with Arrays </h3>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* fetching todo list using axios */}
            <input value={todo.id} type='number' className='form-control' style={{ marginBottom: 5, width: 300 }}
                onChange={(e) => setTodo({ ...todo, id: Number(e.target.value) })}
            />
            <input value={todo.title} type='text' className='form-control' style={{ marginBottom: 5, width: 300 }}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
            <button onClick={createTodo} className='btn btn-primary' style={{ marginBottom: 5, width: 300, marginLeft: 0 }}>
                Create Todo
            </button>
            <button onClick={updateTitle} className='btn btn-success' style={{ marginBottom: 5, width: 300 }}>
                Update Title
            </button>
            <ul className='list-group' style={{ width: 300 }}>
                {todos.map((todo) => (
                    <li key={todo.id} className='list-group-item'>
                        {todo.title}
                        <button onClick={() => removeTodo(todo)} 
                            className='btn btn-danger' style={{ float: 'right' }}>
                            Remove
                        </button>
                        <button onClick={() => fetchTodoById(todo.id)} className='btn btn-warning' style={{ float: 'right' }}>
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
            </div><br />

            <h4> Retrieving Arrays </h4>
            <a href={API} className="btn btn-primary">
                Get Todos
            </a>

            <h4> Retrieving an Item from an Array by ID </h4>
            <div style={{ display: 'flex' }}>
                <input value={todo.id} type="number" className="form-control" style={{ width: '30%' }}
                    onChange={(e) => setTodo({ ...todo, id: Number(e.target.value) })}
                />
                <a href={`${API}/${todo.id}`} className="btn btn-primary">
                    Get Todo by ID
                </a>
            </div>

            <h3> Filtering Array Items </h3>
            <a href={`${API}?completed=true`} className="btn btn-primary">
                Get Completed Todos
            </a>

            <h3> Creating new Items in an Array </h3>
            <a href={`${API}/create`} className="btn btn-primary">
                Create Todo
            </a>

            <h3> Deleting from an Array </h3>
            <div style={{ display: 'flex' }}>
                <input value={todo.id} type="number" className="form-control" style={{ width: '30%' }}
                    onChange={(e) => setTodo({ ...todo, id: Number(e.target.value) })}
                />
                <a href={`${API}/${todo.id}/delete`} className="btn btn-danger">
                    Delete Todo with ID = {todo.id}
                </a>
            </div>

            <h3> Updating an Item in an Array </h3>
            <div style={{ display: 'column' }}>
                <input value={todo.id} type="number" className="form-control" style={{ width: '30%' }}
                    onChange={(e) => setTodo({ ...todo, id: Number(e.target.value) })}
                />
                <input value={todo.title} type="text" className="form-control" style={{ width: '30%' }}
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                />
                <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary">
                    Update Title to {todo.title}
                </a>
            </div>

            <h3> Update Todo Description </h3>
            <div style={{ display: 'column' }}>
                <input value={todo.id} type="number" className="form-control" style={{ width: '30%' }}
                    onChange={(e) => setTodo({ ...todo, id: Number(e.target.value) })}
                />
                <input value={todo.description} type="text" className="form-control" style={{ width: '30%' }}
                    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                />
                <a href={`${API}/${todo.id}/description/${todo.description}`} className="btn btn-primary">
                    Update Description to {todo.description}
                </a>
            </div>

            <h3> Update Todo Completion Status </h3>
            <div style={{ display: 'flex' }}>
                {/* checkbox checked means completed, left uncheck means uncompleted*/}
                <input type="checkbox" className="form-check-input" style={{ transform: 'scale(2)', margin: 15}}
                    checked={todo.completed}
                    onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
                />
                <input value={todo.id} type="number" className="form-control" style={{ width: '30%' }}
                    onChange={(e) => setTodo({ ...todo, id: Number(e.target.value) })}
                />
                <a href={`${API}/${todo.id}/completed/${todo.completed}`} className="btn btn-success">
                    Update Completed to {todo.completed.toString()}
                </a>
            </div>

        </div>
    )
}
export default WorkingWithArrays;