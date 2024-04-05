import axios from "axios";

const COURSES_API = "http://localhost:4000/api/courses";
const ASSIGNMENTS_API = "http://localhost:4000/api/assignments";

// update assignment
export const updateAssignment = async (assignment: any) => {
    const response = await axios
        .put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
    return response.data;
};

// delete assignment
export const deleteAssignment = async (assignmentId: string) => {
    const response = await axios
        .delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
};

// creates a new assignment; posts assignment object in body & encode the course id in the URL
export const createAssignment = async (courseId: string, assignment: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/assignments`,
        assignment
    );
    return response.data;
};

// retrieves assignments for given course
export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};

