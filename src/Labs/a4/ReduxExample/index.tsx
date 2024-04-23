import React from "react";
import TodoList from "./todos/TodoList";
import HelloRedux from "./HelloRedux";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";

const ReduxExamples = () => {
  return(
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux /> <br />
      <CounterRedux /> <br />
      <AddRedux /> <br />
      <TodoList /> <br />
    </div>
  );
};

export default ReduxExamples;