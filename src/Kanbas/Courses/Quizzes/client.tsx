import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_API = `${API_BASE}/api/courses`;
const QUIZZES_API = `${API_BASE}/api/quizzes`;

// update quiz
export const updateQuiz = async (quiz: any) => {
    const response = await axios
        .put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
};

// delete quiz
export const deleteQuiz = async (quizId: string) => {
    const response = await axios
        .delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

// creates a new quiz; posts quiz object in body & encode the course id in the URL
export const createQuiz = async (courseId: string, quiz: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/quizzes`,
        quiz
    );
    return response.data;
};

// retrieves quizzes for given course
export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};

// retrieves quiz by quiz id
export const findQuizById = async (quizId: string) => {
    const response = await axios
        .get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};