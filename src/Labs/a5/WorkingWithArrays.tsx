import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE

function WorkingWithArrays() {
    const API = `${API_BASE}/a5/todos`;
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

    // catch errors
    const [errorMessage, setErrorMessage] = useState(null);


    // using HTTP POST
    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };
    const deleteTodo = async (todo: any) => {
        try {
            const response = await axios.delete(`${API}/${todo.id}`);
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };
    const updateTodo = async () => {
        try {
            const response = await axios.put(`${API}/${todo.id}`, todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };


    return (
        <div>
            <h3> Working with Arrays </h3>
            {errorMessage && (
                <div className="alert alert-danger mb-2 mt-2" style={{ width: 300 }}>
                    {errorMessage}
                </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* fetching todo list using axios */}
                <input value={todo.id} type='number' className='form-control' style={{ marginBottom: 5, width: 300 }}
                    onChange={(e) => setTodo({ ...todo, id: Number(e.target.value) })}
                />
                <input value={todo.title} type='text' className='form-control' style={{ marginBottom: 5, width: 300 }}
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                />
                <textarea value={todo.description} className='form-control' style={{ marginBottom: 5, width: 300 }}
                    onChange={(e) => setTodo({ ...todo, description: e.target.value })}
                />
                <input value={todo.due} type='date' className='form-control' style={{ marginBottom: 5, width: 300 }}
                    onChange={(e) => setTodo({ ...todo, due: e.target.value })}
                />
                <label>
                    <input type='checkbox' checked={todo.completed} className='form-check-input' style={{ margin: 5 }}
                        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
                    />
                    Completed
                </label>
                <button onClick={postTodo} className='btn btn-warning' style={{ marginBottom: 5, width: 300 }}>
                    Post Todo
                </button>
                <button onClick={updateTodo} className='btn btn-info' style={{ marginBottom: 5, width: 300 }}>
                    Update Todo
                </button>
                <button onClick={createTodo} className='btn btn-primary' style={{ marginBottom: 5, width: 300, marginLeft: 0 }}>
                    Create Todo
                </button>
                <button onClick={updateTitle} className='btn btn-success' style={{ marginBottom: 5, width: 300 }}>
                    Update Title
                </button>
                <ul className='list-group' style={{ width: 300 }}>
                    {todos.map((todo) => (
                        <li key={todo.id} className='list-group-item'>
                            <input type='checkbox' checked={todo.completed} readOnly />
                            {todo.title}
                            <p>{todo.description}</p>
                            <p> {todo.due}</p>
                            <button onClick={() => deleteTodo(todo)}
                                className='btn btn-danger' style={{ float: 'right' }}>
                                Delete
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
                <input type="checkbox" className="form-check-input" style={{ transform: 'scale(2)', margin: 15 }}
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