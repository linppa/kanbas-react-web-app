import axios from "axios";

const COURSES_API = "http://localhost:4000/api/courses";
const MODULES_API = "http://localhost:4000/api/modules";

// update module
export const updateModule = async (module: any) => {
    const response = await axios.
        put(`${MODULES_API}/${module._id}`, module);
    return response.data;
};

// delete module
export const deleteModule = async (moduleId: string) => {
    const response = await axios
        .delete(`${MODULES_API}/${moduleId}`);
    return response.data;
};

// creates a new module; posts module object in body & encode the course id in the URL
export const createModule = async (courseId: string, module: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/modules`,
        module
    );
    return response.data;
};

// retrieves modules for given course
export const findModulesForCourse = async (courseId: string) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};