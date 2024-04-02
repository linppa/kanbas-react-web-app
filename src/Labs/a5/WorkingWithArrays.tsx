import React, { useState } from 'react';

function WorkingWithArrays() {
    const API = 'http://localhost:4000/a5/todos';
    const [todo, setTodo] = useState({ 
        id: 1,
        title: 'NodeJS Assignment',
        description: 'Create a NodeJS server with ExpressJS',
        due: '2021-09-09',
        completed: false,
    });

    return (
        <div>
            <h3> Working with Arrays </h3>
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

        </div>
    )
}
export default WorkingWithArrays;