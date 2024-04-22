import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { KanbasState } from "../../../../store";
import { FaPencil } from "react-icons/fa6";
import { FaJediOrder } from "react-icons/fa";


function Questionlist() {
    // Get the question list from the store
    const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions);
    // Handle trying to edit a question
    const handleEdit = (questionId: String) => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions/${questionId}/Edit`);
    }
    const navigate = useNavigate();
    const { courseId, quizId } = useParams();

    return (
        <div style={{ marginLeft: "auto", marginRight: "0" }}>
            <h1>Questions</h1>
            <div>
                <ul>
                    {/* Implement filter so only it corresponds to correct course  */}
                    {questionList.map((question: any, index: number) => (
                        <li 
                        style={{ 
                            border: "1px solid lightgrey", 
                            textDecoration: "none",
                            listStyleType: "none", 
                            marginBottom: "15px",}}
                        key={question._id}>
                            {/* Heading, include what number the question is */}
                            <div style={{ display: "flex", justifyContent: "space-between", padding: "5px", background: "whiteSmoke" }}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    {/* Edit Button */}
                                    <button
                                    style={{marginBottom: "9px" }}
                                     className="btn"
                                     onClick={() => handleEdit(question._id)}>
                                        <FaPencil />
                                    </button>
                                    {/* Question Heading, what number it is */}
                                    <h6 style={{ marginLeft: "0px" }}>Question: {index + 1}</h6>
                                </div>
                                <div style={{marginRight: "15px", marginTop: "10px"}}>
                                    {/* Points of the question */}
                                    {question.points} pts
                                </div>
                            </div>
                            < div style={{background: "white", marginLeft: "15px", marginBottom: "15px"}}>
                                {/* Question */}
                                <hr style={{marginTop: "0px"}}/>
                                {question.question}
                                < br/>
                                < br />
                                {/* Options, if multiple choice or t/f  */}
                                {question.type === "MULTIPLE_CHOICE" || question.type === "T/F" ? (
                                    <ul>
                                        {Object.entries(question.options).map(([key, value]) => (
                                            <li
                                                style={{
                                                    listStyleType: "none",
                                                    marginBottom: "5px",
                                                }}
                                                key={key}>
                                                    {/* Only select the radio button that is the correct answer */}
                                                <label>
                                                    <input type="radio" style={{ marginRight: "5px" }} checked={key === question.correctAnswer} />
                                                    <span> {value as React.ReactNode}</span>
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    // If not multiple choice or t/f, it is then fill in the blank
                                    <div>
                                     Typed Answer:
                                     < br />
                                     <textarea className="form-control"
                                     style={{padding: "10px", width: "90%", marginLeft: "10px"}}
                                     rows = {10} readOnly>{question.answer}</textarea>
                                    </div>
                                )}
                            </div>
                            {/* Testing out */}
                            
                        </li>
                        
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Questionlist;

