import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import { addQuestion, updateQuestion } from '../questionsReducer';

function TFEditor(_question: any) {
    const { courseId, quizId, questionId } = useParams();
    const [question, setQuestion] = useState(_question.question.question);
    const [title, setTitle] = useState(_question.question.title);
    const [correctAnswer, setCorrectAnswer] = useState(_question.question.correctAnswer);
    const [points, setPoints] = useState(_question.question.points);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = () => {
        const questionObj = {
            question: question,
            type: "T/F",
            title: title,
            quizId: quizId,
            points: points,
            options: ["True", "False"], // Only "True" and "False" options
            correctAnswer: correctAnswer
        };
        if (questionId) {
            dispatch(updateQuestion({ _id: questionId, ...questionObj }));
        } else {
            dispatch(addQuestion(questionObj));
        }
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`);
    };

    const handleUpdateOption = (updatedValue: string) => {
        setCorrectAnswer(updatedValue);
    };

    return (
        <div>
            <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {/* Question Title */}
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        style={{ width: "500px" }}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div style={{ marginLeft: "100px" }}>
                        {/* Points of the question */}
                        <input
                            type="number"
                            className="form-control"
                            style={{ width: "60px" }}
                            value={points}
                            onChange={(e) => setPoints(parseInt(e.target.value))}
                        />
                    </div>
                    <span>&nbsp; pts</span>
                    <br />
                    <br />
                </div>
                <br />
                {/* Prop */}
                <small>Enter your question and select the correct answer.</small>
                <h6 style={{ paddingTop: "10px" }}><strong>Question:</strong></h6>
                <div style={{ display: "flex", marginBottom: "10px" }}>
                    <button className="btn">Edit</button>
                    <button className="btn">View</button>
                    <button className="btn">Insert</button>
                    <button className="btn">Format</button>
                    <button className="btn">Tools</button>
                    <button className="btn">Table</button>
                </div>
            </div>
            {/* Question Text Area Edit */}
            <textarea
                className="form-control"
                style={{ height: "50px" }}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
            <br />
            <h6><strong>Answers:</strong></h6>
            {["True", "False"].map((option) => (
                <div key={option}>
                    {option === correctAnswer ? (
                        // Correct Answer
                        <div style={{ display: "inline-block", border: "2px solid green", padding: "15px", marginBottom: "15px", borderRadius: "5px", width:"100%" }}>
                            <span style={{ color: "green" }}>
                                <FaArrowAltCircleRight /> &nbsp;{option}: &nbsp;
                            </span>
                        </div>
                    ) : (
                        // Possible Answer
                        <div style={{ display: "inline-block", border: "2px dashed lightgray", padding: "15px", marginBottom: "15px", borderRadius: "5px", width: "100%" }}>
                            <span style={{ color: "green", opacity: "0.5" }}>
                                <FaArrowAltCircleRight /> &nbsp;{option}: &nbsp;
                            </span>
                            < br />
                            <input
                                    type="radio"
                                    name="correctAnswer"
                                    checked={option === correctAnswer}
                                    onChange={() => handleUpdateOption(option)}
                                />
                                <span> Is This The Correct Answer?</span>
                        </div>
                    )}
                </div>
            ))}
            <div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`} className="btn btn-danger float-end">
                        Cancel
                    </Link>
                    <button className="btn btn-primary" onClick={handleSave}>
                        Save
                    </button>
                </div>
        </div>
    );
}

export default TFEditor;
