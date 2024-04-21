import { createSlice } from "@reduxjs/toolkit";

export enum QuestionType {
    TrueFalse = "True/False",
    MultipleChoice = "Multiple Choice",
    FillInBlank = "Fill in the Blank",
}

const initialState = {
    questions: [] as any[],
    question: {
        _id: "",
        quizId: "",
        title: "New Title",
        points: 0,
        questionPrompt: "New Question",
        questionType: QuestionType.MultipleChoice,
        choices: [],
        trueFalse: Boolean,
        blanks: [],
    },
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        // populate the questions state variable when we retrieve questions from the server
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        addQuestion: (state, action) => {
            state.questions = [action.payload, ...state.questions];
        },
        deleteQuestion: (state, action) => {
            state.questions = state.questions.filter(
                (question) => question._id !== action.payload
            );
        },
        updateQuestion: (state, action) => {
            state.questions = state.questions.map((question) => {
                if (question._id === action.payload._id) {
                    return action.payload;
                } else {
                    return question;
                }
            });
        },
        setQuestion: (state, action) => {
            state.question = action.payload;
        },
        getQuestionId: (state, action) => {
            state.question = state.questions.find((question) => question._id === action.payload);
        },
    },
});

export const { setQuestions, addQuestion, deleteQuestion, updateQuestion, setQuestion, getQuestionId } = questionsSlice.actions;

export default questionsSlice.reducer;




