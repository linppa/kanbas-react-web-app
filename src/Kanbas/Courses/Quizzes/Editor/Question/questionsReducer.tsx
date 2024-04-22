import db from "../../../../Database/questions.json";
import {createSlice} from "@reduxjs/toolkit";
// Set question format
const questions = db as Array<any>;
// Initial state 
const initialState = {
    questions: questions,
    question: {
        _id: "",
        type: "MULTIPLE_CHOICE",
        quizId: "",
        question: {
            "A": "",
        },
        correctAnswer: "",
        points: 0,
    },
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        // set questions
        setQuestion: (state, action) => {
            state.question = action.payload;
        },
        // add question
        addQuestion: (state, action) => {
            state.questions = [action.payload, ...state.questions];
        },
        // delete question
        deleteQuestion: (state, action) => {
            state.questions = state.questions.filter(
                (question) => question._id !== action.payload
            );
        },
        // update question
        updateQuestion: (state, action) => {
            state.questions = state.questions.map((question) => {
                if (question._id === action.payload._id) {
                    return action.payload;
                } else {
                    return question;
                }
            });
            
        },
    }
});
export const { addQuestion, deleteQuestion, updateQuestion, setQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;