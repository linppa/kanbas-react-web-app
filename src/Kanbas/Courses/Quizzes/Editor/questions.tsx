
import { useNavigate, useParams, Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "../client";
import { FaBan, FaPlus, FaSearch } from "react-icons/fa";
import './index.css';
import { useEffect, useState } from "react";
import { addQuiz, setQuiz, updateQuiz, getQuizId } from "../quizzesReducer";
import React from "react";
import QuestionList from "./Question/questionList";

function Questions() {
    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quiz);
    const { quizId } = useParams();
    const { courseId } = useParams();
    const questionList = useSelector((state: KanbasState) =>
        state.questionsReducer.questions); 

    // Calculate the total points of the quiz
    /*
    * Need to be able to implement this total points of the quiz when saving this form
    * Need to alter the quiz.points to be the total points of the quiz determined by looking at the sum
    */
    const totalPoints = questionList.reduce((sum, question) => sum + question.points, 0);
    
    return (
        <div className="me-5">
            <div className="float-end mt-2 ">
                Points : {totalPoints} &nbsp; &nbsp;
                {quiz.isPublished ? <i className="fa fa-check-circle" style={{ color: "green" }} aria-hidden="true"></i> : <FaBan style={{ color: "grey" }} className="text-danger" aria-hidden="true" />}&nbsp;
                {quiz.isPublished ? "Published" : "Not Published"}
                <button type="button" className="btn btn-light"><i className="fa fa-ellipsis-v ms-2"></i></button>
            </div>
            <br />
            <br />
            <hr />
            <nav className="navbar navbar-expand-lg navbar-light bg-color-lightgray">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item m-2">
                                <NavLink
                                    end={true}
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    aria-current="page"
                                    to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Edit`}>
                                    Details
                                </NavLink>
                            </li>
                            <li className="nav-item m-2">
                                <NavLink
                                    end={false}
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    to='#'>
                                    Questions
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <hr />
            <br />
                {/* Question List Should Go Here */}
                <QuestionList />
            <br />
            <br />
            <hr />
            <div>
                    <div className="float-start">
                        <input className="form-check-input" type="checkbox" id="check-9" />
                        <label className="form-check-label" htmlFor="check-9"
                        >Notify users that this content has changed</label>
                    </div>
                    <div>
                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Edit`}
                            
                            className="btn btn-success ms-2 float-end"
                        >
                            Save
                        </Link>
                        <Link to = {`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Edit`}
                            className="btn btn-primary ms-2 float-end"
                        >
                            Save & Publish
                        </Link>
                        <Link to={`/Kanbas/Courses/${courseId}/Quizzes`}
                            className="btn btn-danger float-end">
                            Cancel
                        </Link>
                    </div>
                </div>
            <br />
            <br />
            <hr />
        </div >

    )
};
export default Questions;