import React from "react";
import ReduxExamples from "./ReduxExamples";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import HelloRedux from "./ReduxExamples/HelloRedux";


const Assignment4 = () => {
    function sayHello() {
        alert("Hello!");
    }

    return (
        <div style={{ paddingLeft: "15px" }}><br />
        <>
            <h1>Labs</h1>
            <h1>Assignment 4</h1><br />

            <ClickEvent /><br /><br />
            <PassingDataOnEvent /><br /><br />
            <PassingFunctions theFunction={sayHello}/><br /><br />
            <EventObject /><br /><br />
            <Counter /><br /><br />
            <BooleanStateVariables /><br /><br />
            <StringStateVariables /><br /><br />
            <DateStateVariable /><br /><br />
            <ObjectStateVariable /><br /><br />
            <ArrayStateVariable /><br /><br />
            <ParentStateComponent /><br /><br />

            <ReduxExamples /><br /><br />
            

        </>
        <br />
        </div>
    );
};
export default Assignment4;