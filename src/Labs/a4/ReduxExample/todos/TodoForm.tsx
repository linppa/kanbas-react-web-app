import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { LabState } from "../../../store";

function TodoForm(
) {
  const { todo } = useSelector((state: LabState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <li className="list-group-item">
      <input
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
            <button className="btn btn-warning" style={{ marginLeft: "10px" }}
      onClick={() => dispatch(updateTodo(todo))}> Update </button>
      <button className="btn btn-success" style={{ marginLeft: "10px" }}
      onClick={() => dispatch(addTodo(todo))}> Add </button>
    </li>
  );
}
export default TodoForm;