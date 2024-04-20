import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import * as client from "../client";
import { useEffect } from "react";
import { setQuiz, updateQuiz } from "../quizzesReducer";

function QuizDetails() {
    const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
    const quizId = useParams().quizId;
    const dispatch = useDispatch();
    useEffect(() => {
        client.findQuizById(quizId)
            .then((q:any) => {
                dispatch(setQuiz(q));
            });
    }
    , [quizId]);

    const handlePublishToggle = () => {
        const updatedQuiz = { ...quiz, isPublished: !quiz.isPublished };
        client.updateQuiz(updatedQuiz).then(() => {
          dispatch(setQuiz(updatedQuiz));
        });
      };
    return (
        <div className="me-5">
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
            <button type="button" className={`btn ${quiz.isPublished ? "btn-danger" : "btn-success"}`} onClick={() => handlePublishToggle()}>
                                <i className="fa fa-check-circle" style={{ color: "white" }} aria-hidden="true"></i> {quiz.isPublished ? "Unpublish" : "Publish"}
                            </button>    
                <button type="button" className="btn btn-light">Preview</button>
                &nbsp; 
                <button type="button" className="btn btn-light"><i className="fa fa-pencil" aria-hidden="true"></i> Edit</button>
                <button type="button" className="btn btn-light"><i className="fa fa-ellipsis-v ms-2"></i></button>
            </div>
            <hr />
            <h2>{quiz.title}</h2>
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end" ><b>Quiz Type</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.quizType}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Points</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.points}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Assignment Group</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.assignmentGroup}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Shuffle Answer</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.isShuffled ? "Yes" : "No"}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Time Limit</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.timeLimit} Minutes
                    </div>
                    </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Multiple Attemps</b></div>
                    </div>
                    <div className="col-7" style={{paddingBottom:"0.3em"}}>
                        {quiz.isMultipleAttempts ? "Yes" : "No"}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>View Response</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.viewResponse}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Show Correct Answers</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.showCorrectAnswers}
                    </div>
                    </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Access Code</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.accessCode}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>One Question At a Time</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.onQuestionAtaTime ? "Yes" : "No"}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Webcam Required</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.webcamRequired ? "Yes" : "No"}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3" style={{paddingBottom:"0.3em"}}>
                        <div className="float-end"><b>Lock Questions After Answering</b></div>
                    </div>
                    <div className="col-7">
                        {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                    </div>                
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col-3">
                        <div className="float-start"><b>Due Date</b></div>
                    </div>
                    <div className="col-3">
                        <div className="float-start"><b>For</b></div>
                    </div>
                    <div className="col-3">
                        <div className="float-start"><b>Available From</b></div>
                    </div>
                    <div className="col-3">
                        <div className="float-start"><b>Until</b></div>
                    </div> 
                </div>     
                <hr />
                <div className="row">
                    <div className="col-3">
                        <div className="float-start">{quiz.dueDate}</div>
                    </div>
                    <div className="col-3">
                        <div className="float-start">Everyone</div>
                    </div>
                    <div className="col-3">
                        <div className="float-start">{quiz.availabilityDate}</div>
                    </div>
                    <div className="col-3">
                        <div className="float-start">{quiz.untilDate}</div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
}

export default QuizDetails;