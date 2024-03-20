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

  // handle delete assignment
  const handleDelete = (assignmentId: any) => {
    const confirmation = window.confirm("Are you sure you want to delete assignment?");
    if (confirmation) {
      dispatch(deleteAssignment(assignmentId));
    }
  }

    return (
      <>
        {/* assignments list header */}
        <ul className="list-group wd-modules">
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

                  {/* delete module button */}
                  {/* pop up dialog asking if user is sure about deleting */}
                  <button
                    className="btn btn-danger delete"
                    onClick={() => handleDelete(assignment._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </>
    );
  }

export default AssignmentList;
