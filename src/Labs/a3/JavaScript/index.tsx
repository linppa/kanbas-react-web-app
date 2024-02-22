import VariablesAndConstants from "./variables/VariablesAndConstants";
import VariableTypes from "./variables/VariableTypes";
import BooleanVariables from "./variables/BooleanVariables";
import IfElse from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import WorkingWithArrays from "./arrays/WorkingWithArrays";
import ArrayIndexAndLength from "./arrays/ArrayIndexAndLength";
import JsonStringify from "./json/JsonStringify";
import Add from "./functions/ES5Functions";


function JavaScript() {
    console.log('Hello World!');
    return(
       <div>
          <h1>JavaScript</h1>
            <br /><hr /><br /> 
            {/* Working with Variables */}
            <VariablesAndConstants />
            <VariableTypes />
            <BooleanVariables />

            <br /><hr /><br />
            {/* Working with Conditionals */}
            <IfElse />
            <TernaryOperator />

            <br /><hr /><br />
            {/* Working with ES5 Functions */}
            <Add />

            <br /><hr /><br />
            {/* Working with Arrays */}
            <WorkingWithArrays />
            <ArrayIndexAndLength />
            <JsonStringify />

       </div>
    );
 }
 export default JavaScript