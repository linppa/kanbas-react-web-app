import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV, FaPencilAlt, FaBan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz, updateQuiz } from "../quizzesReducer";
import { KanbasState } from "../../../store";
import * as client from "../client";

function QuizDetail() {

    // const initialQuiz = {
    //     _id: "",
    //     courseId: "",
    //     title: "New Title",
    //     description: "New Description",
    //     quizType: "Graded Quiz",
    //     points: 0,
    //     assignmentGroup: "Quizzes",
    //     isShuffled: true,
    //     timeLimit: 20,
    //     isMultipleAttempts: false,
    //     showCorrectAnswers: "After Due Date",
    //     viewResponse: "After Due Date",
    //     accessCode: "New Access Code",
    //     isPublished: false,
    //     oneQuestionAtaTime: true,
    //     webcamRequired: true,
    //     lockQuestionsAfterAnswering: true,
    //     dueDate: "2023-04-20",
    //     availabilityDate: "2023-04-10",
    //     untilDate: "2023-04-21",
    //     questions: []
    // };

    const { courseId, quizId } = useParams();
    const dispatch = useDispatch();

    const quizList = useSelector(
        (state: KanbasState) => state.quizzesReducer.quizzes
    );

    const quiz = useSelector((state: KanbasState) =>
        state.quizzesReducer.quizzes.find((q) => q._id === quizId)
    );

    const navigate = useNavigate();

    const smallContainerStyle = {
        maxWidth: "70%",
        margin: "0 auto",
    };

    // form fields
    const [quizTitle, setQuizTitle] = useState("");
    const [description, setDescription] = useState("");
    const [quizType, setQuizType] = useState("");
    const [points, setPoints] = useState("");
    const [assignmentGroup, setAssignmentGroup] = useState("");
    const [isShuffled, setIsShuffled] = useState("");
    const [timeLimit, setTimeLimit] = useState("");
    const [isMultipleAttempts, setIsMultipleAttempts] = useState("");
    const [showCorrectAnswers, setShowCorrectAnswers] = useState("");
    const [viewResponse, setViewResponse] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [isPublished, setIsPublished] = useState("");
    const [oneQuestionAtaTime, setOneQuestionAtaTime] = useState("");
    const [webcamRequired, setWebcamRequired] = useState("");
    const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [availabilityDate, setAvailabilityDate] = useState("");
    const [untilDate, setUntilDate] = useState("");

    // get quiz data if exists
    useEffect(() => {
        if (quiz) {
            setQuizTitle(quiz.title);
            setDescription(quiz.description || "");
            setQuizType(quiz.quizType || "Graded Quiz");
            setPoints(quiz.points || "");
            setAssignmentGroup(quiz.assignmentGroup || "Quizzes");
            setIsShuffled(quiz.isShuffled || "");
            setTimeLimit(quiz.timeLimit || "");
            setIsMultipleAttempts(quiz.isMultipleAttempts || "");
            setShowCorrectAnswers(quiz.showCorrectAnswers || "");
            setViewResponse(quiz.viewResponse || "");
            setAccessCode(quiz.accessCode || "");
            setIsPublished(quiz.isPublished || "");
            setOneQuestionAtaTime(quiz.onQuestionAtaTime || "");
            setWebcamRequired(quiz.webcamRequired || "");
            setLockQuestionsAfterAnswering(quiz.lockQuestionsAfterAnswering || "");
            setDueDate(quiz.dueDate || "");
            setAvailabilityDate(quiz.availabilityDate || "");
            setUntilDate(quiz.untilDate || "");
        }
    }, [quiz]);

    // handles toggle published status
    const handlePublish = (quiz: any) => {
        const updatedQuiz = { ...quiz, isPublished: !quiz.isPublished };
        client.updateQuiz(updatedQuiz).then((quiz) => {
            dispatch(updateQuiz(quiz));
            // refresh the page
            client.findQuizzesForCourse(courseId ?? "").then((quizzes) => {
                dispatch(addQuiz(quizzes));
                setShowSuccess(true);
                setSuccessMessage(
                    `Quiz publicity status has been updated successfully.`
                );
            }
            );

        });
    }

    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");


    // handle preview quiz page
    const handlePreview = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Preview`);
    };

    // handle editor quiz page
    const handleEdit = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Edit`);
    };

    // handle cancel
    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    };

    function formatDate(inputDateString: string): string {
        // Create a new Date object using the input date string
        const date: Date = new Date(inputDateString);

        // Define months array for formatting
        const months: string[] = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        // Extract month, day, and year from the date object
        const month: string = months[date.getUTCMonth()];
        const day: number = date.getUTCDate();
        const year: number = date.getUTCFullYear();

        // Format the date string
        const formattedDateString: string = `${month} ${day}, ${year}`;

        return formattedDateString;
    }

    return quiz ? (
        <div style={{ marginRight: 55 }}>
            {/* show success message */}
            {showSuccess && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}

            <div className="d-flex justify-content-end">
                <button
                    type="button"
                    onClick={() => handlePublish(quiz)}
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
                        <b> {quiz.isPublished ? "Unpublish" : "Publish"} </b>
                    </span>
                </button>{" "}
                &nbsp;&nbsp;

                {/* // handle preview quiz page */}
                <button className="btn btn-outline-secondary"
                    onClick={(handlePreview)} >
                    Preview
                </button>{" "}
                &nbsp;&nbsp;

                {/* // handle editor quiz page */}
                <button className="btn btn-outline-secondary"
                    onClick={(handleEdit)} >
                    <FaPencilAlt
                        style={{ color: "grey" }}
                        className="fas fa-check-circle button-color"
                    /> Edit
                </button>{" "}
                
                <button type="button" className="btn wd-module-button ">
                    {" "}
                    &nbsp;&nbsp;
                    <FaEllipsisV className="fas fa-ellipsis-v black-color" />
                </button>
            </div>

            <hr />
            <div>
                <h2>{quiz.title}</h2>
                <br />
                <div className="row">
                    <div className="col-3">
                        <strong className="float-right">Quiz Type</strong>
                    </div>
                    <div className="col-9">{quiz.quizType}</div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <strong className="float-right">Points</strong>
                    </div>
                    <div className="col-9">{quiz.points}</div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <strong className="float-right">Assignment Group</strong>
                    </div>
                    <div className="col-9">{quiz.assignmentGroup}</div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <strong className="float-right">Shuffle Answers</strong>
                    </div>
                    <div className="col-9">{quiz.shuffleAnswers ? "Yes" : "No"}</div>
                </div>
                    <div className="row">
                        <div className="col-3">
                            <strong className="float-right">Time Limit</strong>
                        </div>
                        <div className="col-9">{quiz.timeLimit} minutes</div>
                    </div>

                {quiz.isTimeLimited && (
                    <div className="row">
                        <div className="col-3">
                            <strong className="float-right">Time Limit</strong>
                        </div>
                        <div className="col-9">{quiz.timeLimit}</div>
                    </div>
                )}

                <div className="row">
                    <div className="col-3">
                        <strong className="float-right">Multiple Attempts</strong>
                    </div>
                    <div className="col-9">{quiz.multipleAttempts ? "Yes" : "No"}</div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <strong className="float-right">Show Correct Answers</strong>
                    </div>
                    <div className="col-9">{quiz.showCorrectAnswers}</div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <strong className="float-right">Access Code</strong>
                    </div>
                    <div className="col-9">{quiz.accessCode}</div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <strong className="float-right">One Question At A Time</strong>
                    </div>
                    <div className="col-9">{quiz.oneQuestionAtATime ? "Yes" : "No"}</div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <strong className="float-right">Web Cam Required</strong>
                    </div>
                    <div className="col-9">{quiz.webcamRequired ? "Yes" : "No"}</div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <strong className="float-right">
                            Lock Question After Answering
                        </strong>
                    </div>
                    <div className="col-9">
                        {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                    </div>
                </div>
                <br />
                <br />
                <br />

                <table className="table ">
                    <thead>
                        <tr>
                            <th>Due</th>
                            <th>For</th>
                            <th>Available From</th>
                            <th>Until</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{formatDate(quiz.dueDate)}</td>
                            <td>Everyone</td>
                            <td>{formatDate(quiz.availabilityDate)}</td>
                            <td>{formatDate(quiz.untilDate)}</td>
                        </tr>
                    </tbody>
                </table>
                {/* cancel button */}
                <button
                    className="btn btn-secondary float-end"
                    onClick={handleCancel}
                    style={{ marginRight: 10 }}
                >
                    Return to Quizzes
                </button>
            </div>
        </div>
    ) : (
        <div style={{ padding: 20 }}>
            <button
                className="btn btn-secondary"
                onClick={handleCancel}
                style={{ marginRight: 10 }}
            >
                Return to Quizzes
            </button>
        </div >
    );
}

export default QuizDetail;

