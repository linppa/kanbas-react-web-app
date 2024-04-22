import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../store";
import { useParams } from "react-router";
import { set } from "mongoose";
import { setQuestion } from "../questionsReducer";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import FillInBlankEditor from "./FillInBlankEditor";
import TFEditor from "./TFEditor";
import { Link } from "react-router-dom";

/**
 * 
 * Things to Remember
 * - Need to implement the save button
 * -
 */

function QuestionEditor() {
const {questionId} = useParams();
const question = useSelector((state: KanbasState) =>
    state.questionsReducer.questions.find((q) => q._id === questionId)
);

const [selectedType, setSelectedType] = useState(question.type);
const [points, setPoints] = useState(question.points);
const [title, setTitle] = useState(question.title);
const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
};
const { courseId } = useParams();
const { quizId } = useParams();



return (
    <div 
    style={{
        width:"auto",
        padding: "50px",
        }}>
        <h1>Edit Question</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
            {/* Drop down menu for filtering */}
            <select
                className="form-select"
                style={{ marginLeft: "10px" }}
                value={selectedType}
                onChange={handleTypeChange}>
                <option value="MULTIPLE_CHOICE" selected={question.type === "MULTIPLE_CHOICE"}>Multiple Choice</option>
                <option value="FILL_IN_BLANK" selected={question.type === "FILL_IN_BLANK"}>Fill in the Blank</option>
                <option value="T/F" selected={question.type === "T/F"}>True/False</option>
            </select>

        </div>
        <hr />
        <small>Enter your question and multiple answers, then select the one correct answer.</small>
        <h6 style={{ paddingTop: "10px" }}><strong>Question:</strong></h6>
        <div style={{ display: "flex", marginBottom: "10px" }}>
            <button className="btn">Edit</button>
            <button className="btn">View</button>
            <button className="btn">Insert</button>
            <button className="btn">Format</button>
            <button className="btn">Tools</button>
            <button className="btn">Table</button>
        </div>
        {/* Calling Fill in Blank Editor */}
        {selectedType === "FILL_IN_BLANK" && (
            <FillInBlankEditor question={question} />
        )}
        {/* Calling Multiple Choice Editor */}
        {selectedType === "MULTIPLE_CHOICE" && (
            <MultipleChoiceEditor question={question}/>
        )}
        {/* Calling True or False Editor */}
        {selectedType === "T/F" && (
            <TFEditor question={question} />
            
        )}
    </div>
);
}

export default QuestionEditor;
