import React, { useEffect, useState } from "react"
import { useNavigate, useParams, Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "../client";
import { FaBan, FaEllipsisV, FaCheckCircle } from "react-icons/fa";
import { addQuiz, updateQuiz, setQuiz, getQuizId } from "../quizzesReducer";
import "./index.css";
import { FaX } from "react-icons/fa6";

function QuizEditor() {
    const { courseId } = useParams();
    const dispatch = useDispatch();

    const quizList = useSelector(
        (state: KanbasState) => state.quizzesReducer.quizzes
    );

    const { quizId } = useParams();
    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes.find((q) => q._id === quizId)
    );

    const navigate = useNavigate();

    const smallContainerStyle = {
        maxWidth: "70%",
        margin: "0 auto",
    };
    const {totalPoints} = useParams();
    // form fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [quizType, setQuizType] = useState("");
    const [points, setPoints] = useState(totalPoints);
    const [assignmentGroup, setAssignmentGroup] = useState("");
    const [isShuffled, setIsShuffled] = useState("");
    const [timeLimit, setTimeLimit] = useState("");
    const [isMultipleAttempts, setIsMultipleAttempts] = useState("");
    const [showCorrectAnswers, setShowCorrectAnswers] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [oneQuestionAtaTime, setOneQuestionAtaTime] = useState("");
    const [webcamRequired, setWebcamRequired] = useState("");
    const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [availabilityDate, setAvailabilityDate] = useState("");
    const [untilDate, setUntilDate] = useState("");
    const [questions, setQuestions] = useState("");


    // get quiz data if exists
    useEffect(() => {
        if (!quiz) {
            dispatch(getQuizId(quizId));
        }
        if (quiz) {
            setTitle(quiz.title);
            setDescription(quiz.description || "");
            setQuizType(quiz.quizType || "Graded Quiz");
            setPoints(quiz.points || "");
            setAssignmentGroup(quiz.assignmentGroup || "Quizzes");
            setIsShuffled(quiz.isShuffled || false);
            setTimeLimit(quiz.timeLimit || 20);
            setIsMultipleAttempts(quiz.isMultipleAttempts || false);
            setShowCorrectAnswers(quiz.showCorrectAnswers || "After Due Date");
            setAccessCode(quiz.accessCode || "");
            setOneQuestionAtaTime(quiz.oneQuestionAtaTime || "");
            setWebcamRequired(quiz.webcamRequired || "");
            setLockQuestionsAfterAnswering(quiz.lockQuestionsAfterAnswering || "");
            setDueDate(quiz.dueDate || "");
            setAvailabilityDate(quiz.availabilityDate || "");
            setUntilDate(quiz.untilDate || "");
            setQuestions(quiz.questions || []);
        }
    }, [quiz, quizId, dispatch]);


    // handle form save
    const handleSave = async (publish = false) => {
        const updatedQuizData = {
            ...quiz,
            title,
            description,
            quizType,
            points: Number(points),
            assignmentGroup,
            isShuffled,
            timeLimit: Number(timeLimit),
            isMultipleAttempts,
            showCorrectAnswers,
            accessCode,
            oneQuestionAtaTime,
            webcamRequired,
            lockQuestionsAfterAnswering,
            dueDate,
            availabilityDate,
            untilDate,
            isPublished: publish ? true : quiz?.isPublished,
            questions,
        };
        // If publish is true, update the isPublished state
        if (publish) {
            updatedQuizData.isPublished = true;
        }
        try {
            const response = await client.updateQuiz(updatedQuizData);
            dispatch(updateQuiz(response));
            // Navigate to the list of quizzes after successful update
            navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
        } catch (error) {
            console.error('Failed to update quiz:', error);
            // Show an error message
            alert('An error occurred while saving the quiz. Please try again.');
        }
    };

    // handle cancel
    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };

    // handle quiz type change
    const handleQuizTypeChange = (e: any) => {
        setQuizType(e.target.value);
    };

    // handle shuffle change
    const handleShuffleChange = (e: any) => {
        const newShuffleState = e.target.checked;
        setIsShuffled(newShuffleState);
        dispatch(setQuiz({ ...quiz, isShuffled: newShuffleState }));
    };

    // handle multiple attempts change
    const handleMultipleAttemptsChange = (e: any) => {
        const newMultipleAttemptsState = e.target.checked;
        setIsMultipleAttempts(newMultipleAttemptsState);
        dispatch(setQuiz({ ...quiz, isMultipleAttempts: newMultipleAttemptsState }));
    };

    // handle show correct answers change
    const handleShowCorrectAnswersChange = (e: any) => {
        setShowCorrectAnswers(e.target.value);
    };

    // handle one question at a time change
    const handleOneQuestionAtaTimeChange = (e: any) => {
        const newOneQuestionAtaTimeState = e.target.checked;
        setOneQuestionAtaTime(newOneQuestionAtaTimeState);
        dispatch(setQuiz({ ...quiz, oneQuestionAtaTime: newOneQuestionAtaTimeState }));
    };

    // handle webcam required change
    const handleWebcamRequiredChange = (e: any) => {
        const newWebcamRequiredState = e.target.checked;
        setWebcamRequired(newWebcamRequiredState);
        dispatch(setQuiz({ ...quiz, webcamRequired: newWebcamRequiredState }));
    };

    // handle lock questions after answering change
    const handleLockQuestionsAfterAnsweringChange = (e: any) => {
        const newLockQuestionsAfterAnsweringState = e.target.checked;
        setLockQuestionsAfterAnswering(newLockQuestionsAfterAnsweringState);
        dispatch(setQuiz({ ...quiz, lockQuestionsAfterAnswering: newLockQuestionsAfterAnsweringState }));
    };

    // handle due date change
    const handleDueDateChange = (e: any) => {
        setDueDate(e.target.value);
        dispatch(setQuiz({ ...quiz, dueDate: e.target.value }));
    };

    // handle availability date change
    const handleAvailabilityDateChange = (e: any) => {
        setAvailabilityDate(e.target.value);
        dispatch(setQuiz({ ...quiz, availabilityDate: e.target.value }));
    };

    // handle until date change
    const handleUntilDateChange = (e: any) => {
        setUntilDate(e.target.value);
        dispatch(setQuiz({ ...quiz, untilDate: e.target.value }));
    };


    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between mb-3">
                <h1>Quiz Editor</h1>

                {/* publicity status */}
                <span className="d-flex float-end">
                    <button
                        type="button"
                        style={
                            !quiz.isPublished
                                ? { background: "rgb(2, 128, 2)" }
                                : { background: "rgba(200, 19, 19)" }
                        }
                        className=" btn btn-light">
                        {quiz.isPublished ? (
                            <FaBan style={{ color: "white" }} className="fas fa-ban" />
                        ) : (
                            <FaCheckCircle
                                style={{ color: "white" }}
                                className="fas fa-check-circle"
                            />
                        )}

                        <span style={{ color: "white" }}>
                            <b> {quiz.isPublished ? "Unpublished" : "Published"} </b>
                        </span>
                    </button>{" "}
                    &nbsp;&nbsp;
                    <button
                        style={{ width: "40px" }}
                        className="btn btn-outline-secondary btn-custom buttons"
                    >
                        <FaEllipsisV />
                    </button>
                </span>
            </div>
            <hr className="horizontal-line"></hr>

            {/* navigation tabs */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    aria-current="page"
                                    to='#'>
                                    Details
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    to={`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`}>
                                    Questions
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <hr />

            {/* edit title */}
            <label htmlFor="assignmentName" className="form-label">
                Quiz Title
            </label>
            <input
                type="text"
                className="form-control"
                id="assignmentName"
                value={title}
                defaultValue={quiz ? quiz.title : ""}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />


            {/* description */}
            <label htmlFor="quizDescription" className="form-label">
                Description
            </label>
            <textarea
                className="form-control"
                id="quizDescription"
                value={description}
                rows={3}
                placeholder="Description here..."
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <br />

            {/* quiz type */}
            <label htmlFor="quiz-type">Quiz Type</label>
            <select
                id="quiz-type"
                value={quizType}
                onChange={handleQuizTypeChange}
                className="form-select"
            >
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
            <br />

            {/* points */}
            <div className="mb-3">
                <label htmlFor="points" className="form-label">
                    Points
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="points"
                    defaultValue={quiz ? quiz.points : ""}
                    onChange={(e) => setPoints(e.target.value)}
                />
            </div>

            {/* assignment group */}
            <label htmlFor="assignmentGroup">Assignment Group</label>
            <select
                id="assignmentGroup"
                className="form-select"
                value={assignmentGroup}
                onChange={(e) => setAssignmentGroup(e.target.value)}
            >
                <option value="Quizzes">Quizzes</option>
                <option value="Assignments">Assignments</option>
                <option value="Surveys">Surveys</option>
            </select>
            <br />

            <h3> Options </h3>

            {/* shuffle checkbox */}
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="shuffleAnswers"
                    checked={Boolean(isShuffled)}
                    onChange={handleShuffleChange}
                />
                <label htmlFor="shuffleAnswers" className="form-check-label">Shuffle Answers</label>
            </div>
            <br />

            {/* time limit */}
            <div className="mb-3">
                <label htmlFor="timeLimit" className="form-label">
                    Time Limit (in minutes)
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="timeLimit"
                    defaultValue={timeLimit}
                    onChange={(e) => setTimeLimit(e.target.value)}
                />
            </div>

            {/* multiple attempts */}
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="multipleAttempts"
                    checked={Boolean(isMultipleAttempts)}
                    onChange={(e) => handleMultipleAttemptsChange(e)}
                />
                <label htmlFor="multipleAttempts" className="form-check-label">Multiple Attempts</label>
            </div>
            <br />

            {/* show correct answers */}
            <label htmlFor="showCorrectAnswers">Show Correct Answers</label>
            <select
                id="showCorrectAnswers"
                className="form-select"
                value={showCorrectAnswers}
                onChange={handleShowCorrectAnswersChange}
            >
                <option value="After Each Question">After Each Question</option>
                <option value="After Due Date">After Due Date</option>
                <option value="Never">Never</option>
            </select>
            <br />

            {/* access code */}
            <label htmlFor="accessCode" className="form-label">
                Access Code
            </label>
            <input
                type="text"
                className="form-control"
                id="accessCode"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
            />
            <br />

            {/* one question at a time */}
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="oneQuestionAtaTime"
                    checked={Boolean(oneQuestionAtaTime)}
                    onChange={handleOneQuestionAtaTimeChange}
                />
                <label htmlFor="oneQuestionAtaTime" className="form-check-label">One Question At a Time</label>
            </div>

            {/* webcam required */}
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="webcamRequired"
                    checked={Boolean(webcamRequired)}
                    onChange={handleWebcamRequiredChange}
                />
                <label htmlFor="webcamRequired" className="form-check-label">Webcam Required</label>
            </div>

            {/* lock questions after answering */}
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="lockQuestionsAfterAnswering"
                    checked={Boolean(lockQuestionsAfterAnswering)}
                    onChange={handleLockQuestionsAfterAnsweringChange}
                />
                <label htmlFor="lockQuestionsAfterAnswering" className="form-check-label">Lock Questions After Answering</label>
            </div>
            <br /><br />

            <hr className="horizontal-line"></hr>
            <br /><br />

            {/* assign to box */}
            <div className="row">
                <div className="col-2">
                    <div className="float-end">Assign</div>
                </div>
                <div className="col-8">
                    <ul className="list-group list-group-item wd-kanbas-edit-section">
                        <li className="list-group-item border-0">
                            <h4>Assign to</h4>
                            <div className="form-control">
                                <div className="bg-light p-2 d-inline-block" style={{ margin: "10px" }}>
                                    Everyone <FaX className="ms-2" />
                                </div>
                            </div>
                        </li>

                        {/* due date */}
                        <li className="list-group-item border-0">
                            <b>Due</b>
                        </li>
                        <li className="list-group-item border-0">
                            <input
                                type="date"
                                className="form-control float-start wd-kanbas-width-45 me-1"
                                value={dueDate}
                                onChange={handleDueDateChange}
                            />
                        </li>
                        <br /><br />

                        {/* available from & until */}
                        <li className="list-group-item border-0">
                            <div className="row">
                                <div className="col-6 float-start">
                                    <b className="wd-kanbas-width-45">Available from</b>
                                </div>
                                <div className="col-6 wd-float-start">
                                    <b className="wd-kanbas-width-45">Until</b>
                                </div>
                            </div>
                        </li>

                        {/* available from */}
                        <li className="list-group-item border-0">
                            <div className="row">
                                <div className="col-6 float-start">
                                    <input
                                        type="date"
                                        className="form-control float-start wd-kanbas-width-45 me-1"
                                        value={availabilityDate}
                                        onChange={handleAvailabilityDateChange}
                                    />
                                </div>
                                <div className="col-6 float-start">
                                    <input
                                        type="date"
                                        className="form-control float-start wd-kanbas-width-45 ms-1"
                                        value={untilDate}
                                        onChange={handleUntilDateChange}
                                    />
                                </div>
                            </div>
                            <br /><br />
                        </li>
                    </ul>
                    <br /><br />
                </div>
            </div>

            <hr className="horizontal-line"></hr>
            <br />
            <div>
                <div className="float-start">
                    <input className="form-check-input" type="checkbox" id="check-9" />
                    <label className="form-check-label" htmlFor="check-9"
                    >Notify users that this content has changed</label>
                </div>
                <div>
                    {/* save only */}
                    <button
                        onClick={() => handleSave(false)}
                        className="btn btn-success ms-2 float-end"
                    >
                        Save
                    </button>
                    {/* save & publish */}
                    <button
                        onClick={() => handleSave(true)}
                        className="btn btn-primary ms-2 float-end"
                    >
                        Save & Publish
                    </button>
                    <button
                        onClick={() => handleCancel()}
                        className="btn btn-danger ms-2 float-end"
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <br />
            <br />
            <hr className="horizontal-line"></hr>
            <br /><br />
        </div>

    );
}

export default QuizEditor;