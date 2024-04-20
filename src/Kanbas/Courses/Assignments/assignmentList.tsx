import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlus,
  FaGripVertical,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";
import { KanbasState } from "../../store";
import { addAssignment, deleteAssignment, updateAssignment, setAssignment, setAssignments } from "./assignmentsReducer";
import * as client from "./client";

function AssignmentList() {

  const initialAssignment = {
    _id: "",
    title: "New Assignment Name",
    dueDate: "Due Date & Time",
    points: "Points",
  };

  const { courseId } = useParams();

  useEffect(() => {
    client.findAssignmentsForCourse(courseId ?? "")
      .then((assignments) => dispatch(setAssignments(assignments)));
  }, [courseId]);

  const assignmentList = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignments
  );
  const assignment = useSelector(
    (state: KanbasState) => state.assignmentsReducer.assignment
  );
  const dispatch = useDispatch();

  const [selectedAssignment, setSelectedAssignment] = useState(assignmentList[0]);

  // handle add assignment to server
  const handleAddAssignment = () => {
    client.createAssignment(courseId ?? "", assignment).then((assignment) => {
      dispatch(addAssignment(assignment));
    });
  };

  // handle delete assignment from server
  const handleDeleteAssignment = (assignmentId: string) => {
    client.deleteAssignment(assignmentId).then((status) => {
      dispatch(deleteAssignment(assignmentId));
    });
  };

  // handle delete assignment
  const handleDelete = (assignmentId: any) => {
    const confirmation = window.confirm("Are you sure you want to delete assignment?");
    if (confirmation) {
      dispatch(deleteAssignment(assignmentId));
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-3" style={{ padding: "10px" }}>
        <input
          type="search"
          className="form-control btn-custom-searchbar"
          style={{ width: "50%" }}
          placeholder="Search for Assignments"
        />
        <div>
          <button className="btn btn-outline-secondary btn-custom">
            <FaPlus /> Group
          </button>

          {/* add assignment button */}
          <Link
            to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>
            {/* link to edit/add new assignment */}
            <button className="btn btn-outline-secondary btn-custom-module"
              onClick={handleAddAssignment}>
              <FaPlus /> Assignment
            </button>
          </Link>

          <button className="btn btn-outline-secondary btn-custom-ellipses">
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <hr className="horizontal-line"></hr>

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
                <button
                  className="btn btn-danger delete"
                  onClick={(event) => {
                    event.preventDefault();
                    // warning message before deleting
                    const confirmation = window.confirm("Are you sure you want to delete assignment?");
                    if (confirmation) {
                      handleDeleteAssignment(assignment._id);
                    }
                  }}>
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
