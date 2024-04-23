import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { KanbasState } from "../../../../store";
import { FaPencil, FaTrash } from "react-icons/fa6"; // Import the FaTrash icon
import { FaJediOrder, FaPlus, FaSearch } from "react-icons/fa";
import { addQuestion, deleteQuestion } from "./questionsReducer";
import { Link } from "react-router-dom";

// Function to generate a unique ID
const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

function Questionlist() {
    // initial state of the question
    const initialQuestion = {
        _id: "",
        question: "New Question",
        type: "MULTIPLE_CHOICE",
        title: "New Question Title",
        quizId: "",
        points: 0,
        options: {},
        correctAnswer: "",
    };
    // Get the question list from the store
    const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId, quizId } = useParams();

    // Handle trying to edit a question
    const handleEdit = (questionId: string) => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/${questionId}/Edit`);
    };

    const questionsForQuiz = useSelector((state: KanbasState) => state.questionsReducer.questions)
        .filter((question: any) => question.quizId === quizId);
    
    const handleAddQuestion = () => {
        // Generate a unique _id using generateUniqueId function
        const newQuestion = {
            ...initialQuestion,
            _id: generateUniqueId(),
            quizId: quizId,
        };
        // Dispatch an action to add a new multiple-choice question
        dispatch(addQuestion(newQuestion));
    };
    const handleDeleteQuestion = (questionId: string) => {
        // Dispatch an action to delete a question
        dispatch(deleteQuestion(questionId));
    }

    return (
        <div style={{ marginLeft: "auto", marginRight: "0" }}>
            <h1>Questions</h1>
            <div>
                <ul>
                    {/* Implement filter so only it corresponds to correct quiz  */}
                    {questionsForQuiz.map((question: any, index: number) => (
                        <li
                            style={{
                                border: "1px solid lightgrey",
                                textDecoration: "none",
                                listStyleType: "none",
                                marginBottom: "15px",
                            }}
                            key={question._id}
                        >
                            {/* Heading, include what number the question is */}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "5px",
                                    background: "whiteSmoke",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {/* Edit Button */}
                                    <button
                                        style={{ marginBottom: "9px" }}
                                        className="btn"
                                        onClick={() => handleEdit(question._id)}
                                    >
                                        <FaPencil />
                                    </button>
                                    {/* Question Heading, what number it is */}
                                    <h6 style={{ marginLeft: "0px" }}>Question: {index + 1}</h6>
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {/* Points of the question */}
                                    {question.points} pts
                                    {/* Trash can icon for deleting question */}
                                    <button
                                        style={{ marginLeft: "10px" }}
                                        className="btn"
                                        onClick={() => handleDeleteQuestion(question._id)}
                                    >
                                        <FaTrash style={{color:"black", opacity: "0.7"}}/>
                                    </button>
                                </div>
                            </div>
                            <div style={{ background: "white", marginLeft: "15px", marginBottom: "15px" }}>
                                {/* Question */}
                                <hr style={{ marginTop: "0px" }} />
                                {question.question}
                                <br />
                                <br />
                                {/* Options, if multiple choice */}
                                {question.type === "MULTIPLE_CHOICE" && (
                                    <ul>
                                        {Object.entries(question.options).map(([key, value], index) => (
                                            <li
                                                style={{
                                                    listStyleType: "none",
                                                    marginBottom: "5px",
                                                }}
                                                key={key}
                                            >
                                                {/* Only select the radio button that is the correct answer */}
                                                <label>
                                                    <input
                                                        type="radio"
                                                        style={{ marginRight: "5px" }}
                                                        checked={key === question.correctAnswer}
                                                    />
                                                    <span> {String.fromCharCode(65 + index)}: {value as React.ReactNode}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {/* Option if t/f */}
                                {question.type === "T/F" && (
                                    <div style={{ marginLeft: "30px" }}>
                                        <label style={{ marginBottom: "10px" }}>
                                            <input
                                                type="radio"
                                                style={{ marginRight: "5px" }}
                                                checked={question.correctAnswer === "True"}
                                            />
                                            <span> True</span>
                                        </label>
                                        <br />
                                        <label>
                                            <input
                                                type="radio"
                                                style={{ marginRight: "5px" }}
                                                checked={question.correctAnswer === "False"}
                                            />
                                            <span> False</span>
                                        </label>
                                    </div>
                                )}
                                {/* Fill in the blank*/}
                                {question.type === "FILL_IN_BLANK" && (
                                    <div>
                                        Typed Answer:
                                        <br />
                                        <textarea
                                            className="form-control"
                                            style={{ padding: "10px", width: "90%", marginLeft: "10px" }}
                                            rows={10}
                                            readOnly
                                        >
                                            {question.answer}
                                        </textarea>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Buttons at bottom */}
            <div>
                <button className="btn btn-secondary ms-2 float-end">
                    <FaSearch aria-hidden="true" />
                    Find Questions
                </button>
                <button className="btn btn-secondary ms-2 float-end">
                    <FaPlus aria-hidden="true" />
                    New Question Group
                </button>
                <button className="btn btn-secondary ms-2 float-end" onClick={handleAddQuestion}>
                    <FaPlus aria-hidden="true" />
                    New Question
                </button>
            </div>
        </div>
    );
}
export default Questionlist;
