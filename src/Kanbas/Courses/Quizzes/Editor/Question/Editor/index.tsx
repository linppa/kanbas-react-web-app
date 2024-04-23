import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../../../store";
import { useNavigate, useParams } from "react-router";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import FillInBlankEditor from "./FillInBlankEditor";
import TFEditor from "./TFEditor";
import { addQuestion, updateQuestion } from "../questionsReducer";

function QuestionEditor() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const { quizId } = useParams();
    const questionList = useSelector((state: KanbasState) => state.questionsReducer.questions);

    const { questionId } = useParams();
    const question = useSelector((state: KanbasState) =>
        state.questionsReducer.questions.find((q) => q._id === questionId)
    );

    // Form Fields
    const [questionText, setQuestionText] = useState("");
    const [questionType, setQuestionType] = useState("MULTIPLE_CHOICE");
    const [questionTitle, setQuestionTitle] = useState("");
    const [points, setPoints] = useState(0);
    const [options, setOptions] = useState({});
    const [correctAnswer, setCorrectAnswer] = useState("");

    // Get question data if exists
    useEffect(() => {
        if (question) {
            setQuestionText(question.question);
            setQuestionType(question.type); // Update questionType state based on fetched question
            setQuestionTitle(question.title);
            setPoints(question.points);
            setOptions(question.options);
            setCorrectAnswer(question.correctAnswer);
        }
    }, [question]);

    const handleSave = async () => {
        if (question) {
            const updatedQuestion = {
                ...question,
                question: questionText,
                type: questionType,
                title: questionTitle,
                quizId: quizId,
                _id: questionId,
                points: points,
                options: options,
                correctAnswer: correctAnswer,
            };
            dispatch(updateQuestion(updatedQuestion));
        } else {
            const newQuestion = {
                question: questionText,
                type: questionType,
                title: questionTitle,
                quizId: quizId,
                points: points,
                options: options,
                correctAnswer: correctAnswer,
            };
            dispatch(addQuestion(newQuestion));
        }
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`);
    };

    const handleCancel = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/Questions`);
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = event.target.value;
        setQuestionType(selectedType); // Update questionType state
    };

    return (
        <div style={{ width: "auto", padding: "50px" }}>
            <h1>Edit Question</h1>
            <div style={{ display: "flex", alignItems: "center" }}>
                {/* Drop down menu for filtering */}
                <select
                    className="form-select"
                    style={{ marginLeft: "10px" }}
                    value={questionType} // Use questionType for value
                    onChange={handleTypeChange}
                >
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="FILL_IN_BLANK">Fill in the Blank</option>
                    <option value="T/F">True/False</option>
                </select>
            </div>
            <hr />
            {/* Render appropriate editor based on selected question type */}
            {questionType === "FILL_IN_BLANK" && <FillInBlankEditor question={question} />}
            {questionType === "MULTIPLE_CHOICE" && <MultipleChoiceEditor question={question} />}
            {questionType === "T/F" && <TFEditor question={question} />}
        </div>
    );
}


export default QuestionEditor;


