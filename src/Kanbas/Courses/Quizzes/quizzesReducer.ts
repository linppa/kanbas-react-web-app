import { createSlice } from "@reduxjs/toolkit";
// import { quizzes } from "../../Database";

const initialState = {
    quizzes: [] as any[],
    quiz: {
        _id: "",
        courseId: "",
        title: "New Title",
        description: "New Description",
        instructions: "",
        quizType: "Graded Quiz",
        points: 0,
        assignmentGroup: "Quizzes",
        isShuffled: true,
        timeLimit: 20,
        isMultipleAttempts: false,
        showCorrectAnswers: "After Due Date",
        viewResponse: "After Due Date",
        accessCode: "",
        isPublished: false,
        oneQuestionAtaTime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "2024-04-20",
        availabilityDate: "2024-04-10",
        untilDate: "2024-04-21",
        questions: []
    },
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        // populate the quizzes state variable when we retrieve quizzes from the server
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, action) => {
            state.quizzes = [action.payload, ...state.quizzes];
        },
        deleteQuiz: (state, action) => {
            state.quizzes = state.quizzes.filter(
                (quiz) => quiz._id !== action.payload
            );
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((quiz) => {
                if (quiz._id === action.payload._id) {
                    return action.payload;
                } else {
                    return quiz;
                }
            });
        },
        setQuiz: (state, action) => {
            state.quiz = action.payload;
        },
    },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuiz, setQuizzes } = quizzesSlice.actions;
export default quizzesSlice.reducer;