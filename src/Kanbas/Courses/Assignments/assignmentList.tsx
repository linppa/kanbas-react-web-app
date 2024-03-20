import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlus,
  FaGripVertical,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import { FaPenToSquare } from "react-icons/fa6";
import ".././index.css";

import { KanbasState } from "../../store";
import { addAssignment, deleteAssignment, updateAssignment, selectAssignment } from "./assignmentsReducer";


function AssignmentList() {
  const { courseId } = useParams();
  const assignmentsList = assignments.filter((assignment) => assignment.course === courseId);
  const [selectedAssignment, setSelectedAssignment] = useState(assignmentsList[0]);

  const assignmentList = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignments
  );
  const assignment = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignment
  );
  const dispatch = useDispatch();

  return (
      <>
        {/* FORM TO ADD ASSIGNMENT */}
        <ul className="list-group wd-modules">
          <li className="list-group-item module-form-container">

            {/* add assignment button */}
            <button className="btn btn-success add" onClick={() => dispatch(addAssignment({ ...assignment, course: courseId }))}>
              <FaPlus /> Assignment
            </button>

            {/* update assignment button */}
            <button className="btn btn-primary update" onClick={() => dispatch(updateAssignment(assignment))}>
              Update
            </button>

            {/* input assignment name */}
            <input className="module-input" value={assignment.title}
              onChange={(e) => dispatch(selectAssignment({ ...assignment, title: e.target.value }))
              } />

            {/* add assignment due date */}
            <input className="module-input" value={assignment.dueDate}
              onChange={(e) => dispatch(selectAssignment({ ...assignment, dueDate: e.target.value }))
              } />

            {/* add assignment points */}
            <input className="module-input" value={assignment.points}
              onChange={(e) => dispatch(selectAssignment({ ...assignment, points: e.target.value }))
              } />
          </li>
        </ul> 
        

      {/* assignments list header */}
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

          {/* assignments list content*/}
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
                    }}>
                    <b>Due</b> {assignment.dueDate} | {assignment.points} points
                  </span>
                </div>

                {/* icons float to right */}
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
export default AssignmentList;
