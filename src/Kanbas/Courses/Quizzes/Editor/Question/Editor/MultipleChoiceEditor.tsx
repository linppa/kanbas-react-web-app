import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import { addQuestion, updateQuestion } from '../questionsReducer';

function MultipleChoiceEditor(_question: any) {
    const { courseId, quizId, questionId } = useParams();
    const [question, setQuestion] = useState(_question.question.question);
    const [title, setTitle] = useState(_question.question.title);
    const [options, setOptions] = useState(_question.question.options);
    const [correctAnswer, setCorrectAnswer] = useState(_question.question.correctAnswer);
    const [points, setPoints] = useState(_question.question.points);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = () => {
        const questionObj = {
            question: question,
            type: "MULTIPLE_CHOICE",
            title: title,
            quizId: quizId,
            points: points,
            options: options,
            correctAnswer: correctAnswer
        };
        if (questionId) {
            dispatch(updateQuestion({ _id: questionId, ...questionObj }));
        } else {
            dispatch(addQuestion(questionObj));
        }
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`);
    };

    const handleUpdateOption = (key: string, updatedValue: string) => {
        const updatedOptions = { ...options, [key]: updatedValue };
        setOptions(updatedOptions);
    };

    const handleAddOption = () => {
        const lastLetter = Object.keys(options).reduce((maxLetter, currentLetter) => {
            return currentLetter > maxLetter ? currentLetter : maxLetter;
        }, 'A');

        const nextLetter = String.fromCharCode(lastLetter.charCodeAt(0) + 1);

        const newOptions = { ...options, [nextLetter]: "" };
        setOptions(newOptions);
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
                    <br />
                    <br />
                </div>
                <br />
                {/* Prop */}
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
            {Object.entries(options).map(([key, value]) => (
                <div key={key}>
                    {key === correctAnswer ? (
                        <div style={{ display: "inline-block", border: "2px solid green", padding: "15px", marginBottom: "15px", borderRadius: "5px" }}>
                            <span style={{ color: "green" }}>
                                <FaArrowAltCircleRight /> &nbsp;Correct Answer: &nbsp;
                            </span>
                            <div style={{ padding: "5px", borderRadius: "5px", display: "inline-block", width: "500px" }}>
                                <textarea
                                    className="form-control"
                                    style={{ height: "50px" }}
                                    value={value as string}
                                    onChange={(e) => handleUpdateOption(key, e.target.value)}
                                ></textarea>
                            </div>
                            <br />
                            <br />
                        </div>
                    ) : (
                        // Possible Answer
                        <div style={{ display: "inline-block", border: "2px dashed lightgray", padding: "15px", marginBottom: "15px", borderRadius: "5px" }}>
                            <span style={{ color: "green", opacity: "0.5" }}>
                                <FaArrowAltCircleRight /> &nbsp;Possible Answer: &nbsp;
                            </span>
                            <div style={{ display: "inline-block", width: "500px" }}>
                                <br />
                                <button style={{ display: 'flex', float: 'right', border: '0px', backgroundColor: 'transparent', color: 'grey', marginBottom: "10px" }}>
                                    <FaTrash
                                        onClick={() => {
                                            const { [key]: omit, ...rest } = options;
                                            setOptions(rest);
                                        }}
                                    />
                                </button>
                                <textarea
                                    className="form-control"
                                    style={{ height: "50px" }}
                                    value={value as string}
                                    onChange={(e) => handleUpdateOption(key, e.target.value)}
                                ></textarea>
                                
                            </div>
                            <br />
                            <br />
                            <input
                                    type="radio"
                                    name="correctAnswer"
                                    checked={key === correctAnswer}
                                    onChange={() => setCorrectAnswer(key)}
                                />
                                <span> Is This The Correct Answer?</span>
                        </div>
                    )}
                </div>
            ))}
            <div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                    <button
                        style={{ width: "150px" }}
                        className="btn btn-secondary"
                        onClick={handleAddOption}
                    >
                        Add Option
                    </button>
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
        </div>
    );
}

export default MultipleChoiceEditor;
