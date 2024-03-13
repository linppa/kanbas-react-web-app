import JavaScript from "./JavaScript";
import PathParameters from "./routing/PathParameters";
import Classes from "./Classes";
import Styles from "./Styles";
import ConditionalOutput from "./ConditionalOutput";
import Highlight from "./Highlight";
import Add from "./Add";
import TodoItem from "./todos/TodoItem";
import TodoList from "./todos/TodoList";


function Assignment3() {
  return (
    <div style={{ paddingLeft: "15px" }}><br />
      <h1>Labs</h1>
      <h1>Assignment 3</h1><br />
      
      <TodoList /><br /><br />
      <TodoItem /><br /><br />
      <Add a={3} b={4} /><br /><br />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
      </Highlight><br /><br />
      <ConditionalOutput /><br /><br />
      <Styles /><br /><br />
      <Classes /><br /><br />
      <PathParameters /><br /><br />
      <br /><hr /><br />

      <JavaScript /><br />

    </div>
  )
}
export default Assignment3;