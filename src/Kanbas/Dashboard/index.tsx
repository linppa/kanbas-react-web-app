import React, { useState } from "react";
import { Link } from "react-router-dom";
import { courses } from "../Database";
import * as db from "../Database";
import "./dashboard.css";

/* main dashboard cards page */
// function Dashboard() {
//   const [courses, setCourses] = useState(db.courses);

//   const [course, setCourse] = useState({
//     _id: "0", name: "New Course", number: "New Number",
//     startDate: "2023-09-10", endDate: "2023-12-15",
//     image: "field.jpeg",
//     semester: "Spring 2024"
//   });

//   const updateCourse = () => {
//     setCourses(
//       courses.map((c) => {
//         if (c._id === course._id) {
//           return course;
//         } else {
//           return c;
//         }
//       })
//     );
//   };

//   const addNewCourse = () => {
//     const newCourse = {
//       ...course,
//       _id: new Date().getTime().toString()
//     };
//     setCourses([...courses, { ...course, ...newCourse }]);
//   };
//   const deleteCourse = (courseId: string) => {
//     setCourses(courses.filter((course) => course._id !== courseId));
//   };

function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
      courses: any[]; course: any; setCourse: (course: any) => void;
      addNewCourse: () => void; deleteCourse: (course: any) => void;
      updateCourse: () => void;
    }) {


  return (
    <div className="p-4">
      <div>
        <h1>Dashboard</h1><hr />
        <h4>Course</h4>
        <input value={course.name} className="form-control"
          onChange={(e) => setCourse({ ...course, name: e.target.value })} />
        <input value={course.number} className="form-control"
          onChange={(e) => setCourse({ ...course, number: e.target.value })} />
        <input value={course.startDate} className="form-control" type="date"
          onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
        <input value={course.endDate} className="form-control" type="date"
          onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
        <input value={course.semester} className="form-control"
          onChange={(e) => setCourse({ ...course, semester: e.target.value })} /><br />

        <button onClick={addNewCourse} className="btn btn-primary">
          Add New Course
        </button>
        <button onClick={updateCourse} className="btn btn-primary">
          Update
        </button>

        <br /><br />
      </div>

      <h2>Published Courses (12)</h2> <hr />
      <div className="row">

        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>

              <div className="card">
                <img src={`/images/${course.image}`} className="card-img-top"
                  style={{ height: 150 }} />

                <div className="card-body">
                  <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                    {course.name}

                    {/* edit button */}
                    <button className="btn grey" onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                    }}>
                      Edit
                    </button>

                    {/* delete button */}
                    <button className="btn btn-danger" onClick={(event) => {
                      event.preventDefault();
                      deleteCourse(course._id);
                    }}>
                      Delete
                    </button>
                  </Link>

                  {/* go button */}
                  <p className="card-text">{course.name}</p>
                  <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">
                    Go </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;