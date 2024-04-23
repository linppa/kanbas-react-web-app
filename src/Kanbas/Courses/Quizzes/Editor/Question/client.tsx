import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const QUIZZES_API = `${API_BASE}/api/quizzes`;
const QUESTIONS_API = `${API_BASE}/api/questions`;

// update questions for a quiz
export const updateQuestions = async (quizId: string, questions: any) => {
    const response = await axios
        .put(`${QUIZZES_API}/${quizId}/questions`, questions);
    return response.data;
};

// delete quiz question
export const deleteQuestion = async (questionId: string) => {
    const response = await axios
        .delete(`${QUESTIONS_API}/${questionId}`);
    return response.data;
};

// creates a new question; posts question object in body & encode the quiz id in the URL
export const createQuestion = async ( quizId: string, question: any) => {
    const response = await axios.post(
        `${QUIZZES_API}/${quizId}/questions`,
        question
    );
    return response.data;
};

// retrieves questions for given quiz
export const findQuestionsForQuiz = async (quizId: string) => {
    const response = await axios
        .get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
};
// retrieves question by question id
export const findQuestionById = async (questionId: string) => {
    const response = await axios
        .get(`${QUESTIONS_API}/${questionId}`);
    return response.data;
};
