import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEllipsisV, FaCheckCircle, FaPlus, FaGripVertical, FaRocket } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import { addQuiz, deleteQuiz, updateQuiz, setQuiz, setQuizzes } from "./quizzesReducer";
import * as client from "./client";

function QuizList() {

    const initialQuiz = {
        _id: "",
        courseId: "",
        title: "New Title",
        description: "New Description",
        quizType: "",
        points: 0,
        assignmentGroup: "Quizzes",
        isShuffled: true,
        timeLimit: 20,
        isMultipleAttempts: false,
        showCorrectAnswers: "After Due Date",
        viewResponse: "After Due Date",
        accessCode: "New Access Code",
        isPublished: true,
        onQuestionAtaTime: true,
        webcamRequired: true,
        lockQuestionsAfterAnswering: true,
        dueDate: "2023-04-20",
        availabilityDate: "2023-04-10",
        untilDate: "2023-04-21",
        questions: []
    };

    const { courseId } = useParams();

    useEffect(() => {
        client.findQuizzesForCourse(courseId ?? "")
            .then((quizzes) => dispatch(setQuizzes(quizzes)));
    }, [courseId]);

    const quizList = useSelector(
        (state: KanbasState) => state.quizzesReducer.quizzes
    );
    const quiz = useSelector(
        (state: KanbasState) => state.quizzesReducer.quiz
    );
    const dispatch = useDispatch();

    const [selectedQuiz, setSelectedQuiz] = useState(quizList[0]);

    // handle add quiz to server
    const handleAddQuiz = () => {
        client.createQuiz(courseId ?? "", quiz).then((quiz) => {
            dispatch(addQuiz(quiz));
        });
    };

    // handle delete quiz from server
    const handleDeleteQuiz = (quizId: string) => {
        client.deleteQuiz(quizId).then((status) => {
            dispatch(deleteQuiz(quizId));
        });
    };

    // handle delete quiz
    const handleDelete = (quizId: any) => {
        const confirmation = window.confirm("Are you sure you want to delete quiz?");
        if (confirmation) {
            dispatch(deleteQuiz(quizId));
        }
    }

    // ** handles quiz availability **
    const handleAvailability = (quizId: any) => {
        // if current date is after quizzes availability date, "Closed"
        // if current date is between Available data and available until data, "Available"
        const quiz = quizList.find((quiz) => quiz._id === quizId);
        if (!quiz) {
            return "Quiz not found";
        }
        const today = new Date();
        const availabilityDate = new Date(quiz.availabilityDate);
        const untilDate = new Date(quiz.untilDate);
        if (today < availabilityDate) {
            return "Not yet available";
        } else if (today > untilDate) {
            return "Closed";
        } else {
            return "Available";
        }
    };

    // ** on clicking ellipsis, show quiz options (edit, delete, publish, copy, sort) **
    const [contextMenu, setContextMenu] = useState<{ quizId: any, anchorPoint: { x: number, y: number } } | null>(null);

    const handleContextMenuOpen = (event: any, quizId: any) => {
        event.preventDefault();
        setContextMenu({
            quizId,
            anchorPoint: { x: event.clientX, y: event.clientY }
        });
    };

    const handleContextMenuClose = () => {
        setContextMenu(null);
    };

    return (
        <>
            <div className="d-flex justify-content-between mb-3" style={{ padding: "10px" }}>
                <input
                    type="search"
                    className="form-control btn-custom-searchbar"
                    style={{ width: "50%" }}
                    placeholder="Search for Quiz"
                />
                <div>
                    {/* add quiz button */}
                    <Link
                        to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}>
                        <button className="btn btn-outline-secondary btn-custom-module"
                            onClick={handleAddQuiz}>
                            <FaPlus /> Quiz
                        </button>
                    </Link>

                    <button className="btn btn-outline-secondary btn-custom-ellipses">
                        <FaEllipsisV />
                    </button>
                </div>
            </div >
            <hr className="horizontal-line"></hr>

            {/* quizzes list header */}
            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>
                        <FaEllipsisV style={{ color: "gray" }} className="me-2" />
                        <span style={{ fontWeight: "bold" }}>QUIZZES</span>
                    </div>

                    {/* quizzes list content */}
                    <ul className="list-group">
                        {quizList.map((quiz) => (
                            <li className="list-group-item d-flex align-items-center">
                                <div>
                                    <div className="d-flex align-items-center">
                                        <FaRocket style={{ color: "gray" }} className="me-2" />
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                                        className="link-custom"
                                        style={{
                                            marginLeft: "10px",
                                            color: "black",
                                            fontWeight: "bolder",
                                        }} >
                                        {quiz.title}
                                    </Link>
                                    <br />

                                    {/* subtext under quiz title */}
                                    <span className="subtext"
                                        style={{
                                            marginLeft: "10px",
                                            marginRight: "5px",
                                        }}>
                                        <b>{handleAvailability(quiz._id)}</b> | <b>Due</b> {quiz.dueDate} | {quiz.points} points
                                    </span>
                                </div>

                                {/* icons float to right */}
                                < div className="float-end" >
                                    <FaCheckCircle className="text-success" />
                                    <FaEllipsisV style={{ color: "gray" }} className="ms-2" />
                                </div>

                                {/* delete module button */}
                                <button
                                    className="btn btn-danger delete"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        handleDelete(quiz._id);
                                    }}> Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </>
    );
}

export default QuizList;




