import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router";
import { useNavigate, Link } from "react-router-dom";
import { addQuestion, updateQuestion } from '../questionsReducer';

function FillInBlankEditor(_question: any) {
    const { courseId, quizId, questionId } = useParams();
    const [title, setTitle] = useState(_question.title || "");
    const [question, setQuestion] = useState(_question.question || "");
    const [answers, setAnswers] = useState(_question.answers || []);
    const [points, setPoints] = useState(_question.points || 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = () => {
        const questionObj = {
            title: title,
            type: "FILL_IN_BLANK",
            quizId: quizId,
            points: points,
            question: question,
            answers: answers
        };
        if (questionId) {
            dispatch(updateQuestion({ _id: questionId, ...questionObj }));
        } else {
            dispatch(addQuestion(questionObj));
        }
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`);
    };

    const handleAddAnswer = () => {
        setAnswers([...answers, ""]);
    };

    const handleRemoveAnswer = (index: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers.splice(index, 1);
        setAnswers(updatedAnswers);
    };

    const handleAnswerChange = (index: number, value: string) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
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
                        placeholder='Enter question title...'
                    />
                    <div style={{ marginLeft: "100px" }}>
                        {/* Question Points */}
                        <input
                            type="number"
                            className="form-control"
                            style={{ width: "60px" }}
                            value={points}
                            onChange={(e) => setPoints(parseInt(e.target.value))}
                        />
                    </div>
                    <br />
                    <div style={{ marginLeft: "10px" }}>
                        <span>Pts</span>
                    </div>
                    <br />
                </div>
                <br />
                <small>Enter your question and specify the correct answers.</small>
                <h6 style={{ paddingTop: "10px" }}><strong>Question:</strong></h6>
            </div>
            {/* Question */}
            <textarea
                className="form-control"
                style={{ height: "50px" }}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder='Enter question...'
            ></textarea>
            <br />
            <h6><strong>Answers:</strong></h6>
            {answers.map((answer: string, index: number) => (
                <div key={index}>
                    {/* Input field for each answer */}
                    <label>{`Answer ${index + 1}: `}</label>
                    <input
                        type="text"
                        className="form-control"
                        value={answer}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        placeholder='Enter answer...'
                    />
                    <button 
                    className="btn btn-secondary" 
                    onClick={() => handleRemoveAnswer(index)}
                    style={{ marginTop: '8px', marginBottom: '10px' }}>
                        Remove
                        </button>
                </div>
            ))}
            <button 
            className="btn btn-secondary" 
            onClick={handleAddAnswer}
            style={{ marginTop: '10px' }}>
                Add
                </button>
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

export default FillInBlankEditor;
