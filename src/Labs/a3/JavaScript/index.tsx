import VariablesAndConstants from "./variables/VariablesAndConstants";
import VariableTypes from "./variables/VariableTypes";
import BooleanVariables from "./variables/BooleanVariables";
import IfElse from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import WorkingWithArrays from "./arrays/WorkingWithArrays";
import ArrayIndexAndLength from "./arrays/ArrayIndexAndLength";
import JsonStringify from "./json/JsonStringify";
import Add from "./functions/ES5Functions";
import ArrowFunction from "./functions/ArrowFunctions";
import ImpliedReturn from "./functions/ImpliedReturn";
import FunctionParenthesisAndParameters from "./functions/FunctionParenthesisAndParameters";
import AddingAndRemovingDataToFromArrays from "./arrays/AddingAndRemovingDataToFromArrays";
import ForLoops from "./arrays/ForLoops";
import MapFunction from "./arrays/MapFunction";
import FindFunction from "./arrays/FindFunction";
import FindIndex from "./arrays/FindIndex";
import FilterFunction from "./arrays/FilterFunction";
import TemplateLiterals from "./string/TemplateLiterals";
import House from "./json/House";
import Spreading from "./json/Spreading";
import Destructing from "./json/Destructing";
import FunctionDestructing from "./json/FunctionDestructing";



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
            <ArrowFunction />
            <ImpliedReturn />
            <FunctionParenthesisAndParameters />

            <br /><hr /><br />
            {/* Working with Arrays */}
            <WorkingWithArrays />
            <ArrayIndexAndLength />
            <AddingAndRemovingDataToFromArrays />
            <ForLoops />
            <MapFunction />
            <JsonStringify />
            <FindFunction />
            <FindIndex />
            <FilterFunction />

            <br /><hr /><br />
            {/* Template Literals */}
            <TemplateLiterals />
            <House />
            <Spreading />
            <Destructing />
            <FunctionDestructing />



       </div>
    );
 }
 export default JavaScript