import React from "react";
import { Navigate, Route, Routes, useParams, useLocation, Link } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import { courses } from "../../Kanbas/Database";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";

import Quizzes from "./Quizzes";
import QuizDetail from "./Quizzes/Detail";
import QuizEditor from "./Quizzes/Editor";
import Questions from "./Quizzes/Editor/questions";

import "./index.css";
import { FaGlasses } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import QuestionEditor from "./Quizzes/Editor/Question/Editor";

{/* main course page */}
function Courses() {
  const { courseId } = useParams();
  const COURSES_API = "http://localhost:4000/api/courses";
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(
      `${COURSES_API}/${courseId}`
    );
    setCourse(response.data);
  };
  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  const { pathname } = useLocation();
  const courseBasePath = `/Kanbas/Courses/${courseId}/Home`;

  return (
    <div>
      {/* breadcrumb top bar */}
      <div className="course-breadcrumb">
        {/* if assignment editor page */}
        {pathname.includes("Assignments/") ? (
          <>
            <HiMiniBars3 className="icon-large" /> <Link className="link" to={courseBasePath}> {course?.number} {course?.name}</Link> {" > "} <Link className="link" to={`${courseBasePath}/Assignments`}> Assignments</Link> {" > "} {pathname.split("/").pop()}
          </>
        ) : (
          <>
            <HiMiniBars3 className="icon-large" /> <Link className="link" to={courseBasePath}> {course?.number} {course?.name}</Link> {" > "} {pathname.split("/").pop()}
          </>
        )}
      
        <button className="btn btn-outline-secondary btn-custom float-end" style={{marginRight: "15px"}}>
          <FaGlasses /> Student View
        </button>
        <hr className="horizontal-line"></hr>

      </div>

      {/* course navigation bar */}
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "300px", top: "70px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h1>Piazza</h1>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:assignmentId" element={<AssignmentEditor />} />
            <Route path="Grades" element={<Grades />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:quizId" element={<QuizDetail />} />
            <Route path="Quizzes/:quizId/Edit" element={<QuizEditor />} />
            <Route path="Quizzes/:quizId/Questions" element={<Questions />} />
            <Route path="Quizzes/:quizId/Questions/:questionId/Edit" element={<QuestionEditor />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses;