import {
    FaEllipsisV,
    FaCheckCircle,
    FaPlus,
    FaGripVertical,
  } from "react-icons/fa";
  import { FaPenToSquare } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { setQuiz, deleteQuiz, addQuiz, updateQuiz, setQuizzes } from "./quizzesReducer";
import { useEffect, useRef, useState } from "react";
import * as client from "./client";

function Quizzes() {
  const initialQuiz = {
    title: "New Quiz Title",
    description: "New Quiz Description",
    courseId: "Course ID",
    points: 0,
    quizType: "Quiz",
    timeLimit: 0,
    assignmentGroup: "Quizzes",
    isShuffled: false,
    isMultipleAttempts: false,
    isPublished: false,
    viewResponse: "Always",
    showCorrectAnswers: "Immediately",
    accessCode: "",
    onQuestionAtaTime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "2023-09-18",
    availabilityDate: "2023-09-11",
    untilDate: "2023-09-18",
    questions: [],
  };

  const { courseId } = useParams();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client.findQuizzesForCourse(courseId)
      .then((quizzes) =>
        dispatch(setQuizzes(quizzes))
      );
  }, [courseId]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event:any) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowContextMenu(false);
    }
  };

  const handleDeleteQuiz = (quizId:any) => {
    client.deleteQuiz(quizId).then(() => {
      dispatch(deleteQuiz(quizId));
    });
  };

  const handlePublishToggle = (quizId:any) => {
    const quizToUpdate = quizzes.find(quiz => quiz._id === quizId);
    const updatedQuiz = { ...quizToUpdate, isPublished: !quizToUpdate.isPublished };
    client.updateQuiz(updatedQuiz).then(() => {
      dispatch(updateQuiz(updatedQuiz));
    });
  };

  const quizzes = useSelector((state: KanbasState) =>
    state.quizzesReducer.quizzes
  );
  const quiz = useSelector((state: KanbasState) =>
    state.quizzesReducer.quiz
  );
  const dispatch = useDispatch();

  const toggleContextMenu = (quizId:any, event:any) => {
    setMenuPosition({ x: event.clientX-80, y: event.clientY });
    setShowContextMenu(!showContextMenu);
    setSelectedQuizId(quizId);
  };

  return (
    <>
    <div className="d-flex justify-content-between mb-3" style={{ padding: "10px" }}>
        <input
            type="search"
            className="form-control btn-custom-searchbar"
            style={{ width: "50%" }}
            placeholder="Search for Quizzes"
        />
        <div>
            <button className="btn btn-outline-secondary btn-custom">
            <FaPlus /> Group
            </button>
            <Link
            to={`/Kanbas/Courses/${courseId}/Quizzes/new`}
            >
            <button className="btn btn-outline-secondary btn-custom">
                <FaPlus /> Quiz
            </button>
            </Link>
            <button className="btn btn-outline-secondary btn-custom-ellipses">
            <FaEllipsisV />
            </button>
        </div>
    </div>
    <hr className="horizontal-line"></hr>

    {/* quiz list */}
    <ul className="list-group wd-modules">
        <li className="list-group-item">
            <div>
            <FaEllipsisV style={{ color: "gray" }} className="me-2" />
            <span style={{ fontWeight: "bold" }}>QUIZZES</span>
            <span className="float-end">
            <span className="badge rounded-pill bg-light text-dark rounded-pill-big">
                40% of total
              </span>
              <FaPlus style={{ color: "gray" }} className="ms-2" />
              <FaEllipsisV style={{ color: "gray" }} className="ms-2" />
            </span>
          </div>

          {/* quizzes list content*/}
            <ul className="list-group">
            {quizzes
              .filter((quiz) => quiz.courseId === courseId)
              .map((quiz) => (
                <li key={quiz._id} className="list-group-item wd-kanbas-assignment-border">
                  <div className=" ms-3">
                    <i className="fa fa-pencil-square-o fa-2x float-start mt-3  mb-3 icon-front wd-kanbas-green"></i>
                    <i className="fa fa-ellipsis-v fa-2x float-end mt-3 ms-2" onClick={(event) => toggleContextMenu(quiz._id, event)}></i>
                    <i className={`${quiz.isPublished?"fa fa-check-circle fa-2x float-end mt-3 me-4 wd-kanbas-green":"fa fa-check-circle fa-2x float-end mt-3 me-4 wd-kanbas-faded-green"}`}
                      onClick={() => handlePublishToggle(quiz._id)}></i>
                    <div></div>
                    <h4 className=" mt-1 mb-1">
                      <Link
                        to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                        className="wd-kanbas-no-underline wd-kanbas-black"
                        onClick={() => dispatch(setQuiz(quiz))}
                      >
                        {quiz.title}
                      </Link>
                    </h4>
                    <div>
                      {quiz.description}
                      <br />
                      <b>{quiz.dueDate < Date.now ? "Closed" : "Available"}</b> &nbsp;  |  &nbsp; <b>Due</b>  {quiz.dueDate} at 11:59pm  &nbsp; |  &nbsp; {quiz.points} points  &nbsp; |  &nbsp; {quiz.questions.length} questions
                    </div>
                  </div>
                  {showContextMenu && selectedQuizId == quiz._id && (
                <div ref={menuRef} className="floating-menu" style={{ top: menuPosition.y, left: menuPosition.x }}>
                  <ul>
                    <li onClick={() => handleDeleteQuiz(quiz._id)}>Delete</li>
                    <li>
                      <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}>Edit</Link>
                    </li>
                    <li onClick={() => handlePublishToggle(quiz._id)}>
                      {quiz.isPublished ? "Unpublish" : "Publish"}
                    </li>
                  </ul>
                  </div>
                  )}
                </li>
              ))}
            </ul>
        </li>
    </ul>
    </>
    );
}

export default Quizzes;

                        

