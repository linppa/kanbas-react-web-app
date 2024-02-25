import React from "react";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlus,
  FaHandPaper,
  FaDotCircle,
  FaGripVertical,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import { FaPenToSquare } from "react-icons/fa6";
import ".././index.css";

function Assignments() {
  const { courseId } = useParams();
  const assignmentList = assignments.filter(
    (assignment) => assignment.course === courseId
  );
  const { dueDate } = useParams();

  return (
    <>
      {/* search bar & action buttons */}
      <div className="d-flex justify-content-between mb-3" style={{padding: "10px"}}>
        <input
          type="search"
          className="form-control btn-custom-searchbar"
          placeholder="Search for Assignments"
        />
        <div>
          <button className="btn btn-outline-secondary btn-custom">
            <FaPlus /> Group
          </button>
          <button className="btn btn-outline-secondary btn-custom-module">
            <FaPlus /> Assignment
          </button>
          <button className="btn btn-outline-secondary btn-custom-ellipses">
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <hr className="horizontal-line"></hr>

      {/* assignments list */}
      <ul className="list-group wd-modules" style={{ padding: "15px" }}>
        <li className="list-group-item">
          <div>
            <FaEllipsisV style={{ color: "gray" }} className="me-2" />
            <span style={{ fontWeight: "bold" }}>ASSIGNMENTS</span>
            <span className="float-end">
              <span className="badge rounded-pill bg-light text-dark rounded-pill-big">
                40% of total
              </span>
              <FaPlus style={{ color: "gray" }} className="ms-2" />
              <FaEllipsisV style={{ color: "gray" }} className="ms-2" />
            </span>
          </div>

          {/* assignments */}
          <ul className="list-group">
            {assignmentList.map((assignment) => (
              <li className="list-group-item d-flex align-items-center">
                <div>
                  <div className="d-flex align-items-center">
                    <FaGripVertical
                      style={{ color: "gray" }}
                      className="me-2"
                    />
                    <FaPenToSquare
                      style={{ color: "green" }}
                      className="me-2"
                    />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <Link
                    to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                    className="link-custom"
                    style={{
                      marginLeft: "10px",
                      color: "black",
                      fontWeight: "bolder",
                    }}
                  >
                    {assignment.title}
                  </Link>
                  <br />

                  {/* subtext under assignment */}
                  <span
                    className="subtext"
                    style={{
                      marginLeft: "10px",
                      marginRight: "5px",
                    }}
                  >
                    <b>Due</b> {assignment.dueDate} | {assignment.points} points
                  </span>
                </div>
                <div className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaEllipsisV style={{ color: "gray" }} className="ms-2" />
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
export default Assignments;
