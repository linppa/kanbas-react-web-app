import React from "react";
import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import {
  FaFileImport,
  FaFileExport,
  FaFilter,
} from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";

function Grades() {
  const { courseId } = useParams();
  const as = assignments.filter((assignment) => assignment.course === courseId);
  const es = enrollments.filter((enrollment) => enrollment.course === courseId);
  const studentNames = users.map(
    (user) => `${user.firstName} ${user.lastName}`
  );

  return (
    <div>
      <div>
        <span className="float-end" style={{ padding: "10px" }}>
          <button className="btn btn-outline-secondary btn-custom buttons">
            <FaFileImport />
            Import
          </button>

          <button className="btn btn-outline-secondary btn-custom buttons">
            <FaFileExport /> Export
          </button>

          <button
            style={{ width: "40px" }}
            className="btn btn-outline-secondary btn-custom buttons">
            <BsGearFill />
          </button>
        </span>
        <br />
        <br />
      </div>
      <br />

      <div className="row mb-4">
        <div className="col-md-6">
          <label htmlFor="searchStudents" className="form-label">
            <strong>Student Names</strong>
          </label>
          <select className="form-select" id="searchStudents">
            <option>Search Students</option>
            {users.map((user, index) => (
              <option
                key={index}
                value={user._id}
              >{`${user.firstName} ${user.lastName}`}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="searchAssignments" className="form-label">
            <strong>Assignment Names</strong>
          </label>
          <select className="form-select" id="searchAssignments">
            <option>Search Assignment Names</option>
            {as.map((assignment, index) => (
              <option key={index} value={assignment._id}>
                {assignment.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="btn btn-outline-secondary btn-custom buttons">
        <FaFilter /> Apply Filter
      </button>
      <br />

      <div className="table-responsive mt-3" style={{ padding: "10px" }}>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Student Name</th>
              {as.map((assignment) => (
                <th key={assignment._id}>{assignment.title}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {es.map((enrollment) => {
              const student = users.find(
                (user) => user._id === enrollment.user
              );
              return (
                <tr key={enrollment._id}>
                  <td>
                    {student
                      ? `${student.firstName} ${student.lastName}`
                      : "Unknown"}
                  </td>
                  {as.map((assignment) => {
                    const grade = grades.find(
                      (g) =>
                        g.student === enrollment.user &&
                        g.assignment === assignment._id
                    );
                    return (
                      <td key={assignment._id} className="text-center">
                        {grade ? (
                          grade.grade
                        ) : (
                          // allow input for grades, placeholder 100
                          <input
                            type="text"
                            className="form-control"
                            placeholder="100"
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grades;
