import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./index.css";
import { courses } from "../../Database";

function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Grades", "Assignments"];
  const { pathname } = useLocation();
  const { courseId } = useParams();
  const course = courses.find((course) => course._id === courseId);

  return (
    <ul className="wd-navigation">
      <li className="wd-course-number">
        {course?.number} {course?.semester}
      </li>

      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
          <Link to={link}>{link}</Link>
        </li>
      ))}
    </ul>
  );
}
export default CourseNavigation;
