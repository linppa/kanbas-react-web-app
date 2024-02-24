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
import "./index.css";
import { FaGlasses } from "react-icons/fa";

{/* main course page */}
function Courses() {
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);

  const { pathname } = useLocation();
  const courseBasePath = `/Kanbas/Courses/${courseId}/Home`;

  return (
    <div>
      {/* breadcrumb top bar */}
      <div className="course-breadcrumb">
        <HiMiniBars3 className="icon-large" /> <Link className="link" to ={courseBasePath}> {course?.number} {course?.name}</Link> {" > "} {pathname.split("/").pop()}

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
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Courses;