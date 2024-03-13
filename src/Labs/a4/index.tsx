import React from "react";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";

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
            

        </>
        <br />
        </div>
    );
};
export default Assignment4;