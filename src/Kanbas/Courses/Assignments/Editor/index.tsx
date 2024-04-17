import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssignment,
  updateAssignment,
} from "../assignmentsReducer";
import { KanbasState } from "../../../store";
import * as client from "../client";

function AssignmentEditor() {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  const { assignmentId } = useParams();
  const assignment = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignments.find((a) => a._id === assignmentId)
  );

  const navigate = useNavigate();

  const smallContainerStyle = {
    maxWidth: "70%",
    margin: "0 auto",
  };

  // form fields
  const [assignmentName, setAssignmentName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [availableFromDate, setAvailableFromDate] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  // get assignment data if exists
  useEffect(() => {
    if (assignment) {
      setAssignmentName(assignment.title);
      setDescription(assignment.description || "");
      setPoints(assignment.points || "");
      setDueDate(assignment.dueDate || "");
      setAvailableFromDate(assignment.availableFromDate || "");
      setAvailableUntil(assignment.availableUntil || "");
    }
  }, [assignment]);

  // handle form save
  const handleSave = async () => {
    if (assignment) {
      const updatedAssignment = {
        ...assignment,
        title: assignmentName,
        description: description,
        points: points,
        dueDate: dueDate,
        availableFromDate: availableFromDate,
        availableUntil: availableUntil,
      };

      const status = await client.updateAssignment(updatedAssignment);
      dispatch(updateAssignment(updatedAssignment));
    } else {
      const newAssignment = {
        title: assignmentName,
        description: description,
        points: points,
        dueDate: dueDate,
        availableFromDate: availableFromDate,
        availableUntil: availableUntil,
      };

      const status = await client.createAssignment(courseId ?? "", newAssignment);
      dispatch(addAssignment(newAssignment));
    }

    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  // handle cancel
  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between mb-3">
        <h2>Edit Assignment</h2>

        <span className="d-flex float-end">
          <button
            className="btn btn-outline-secondary btn-custom buttons"
            style={{
              border: "0px",
              backgroundColor: "transparent",
              color: "green",
            }}
          >
            <FaCheckCircle className="me-2" style={{ color: "green" }} />
            Publish
          </button>
          <button
            style={{ width: "40px" }}
            className="btn btn-outline-secondary btn-custom buttons"
          >
            <FaEllipsisV />
          </button>
        </span>
      </div>
      <hr className="horizontal-line"></hr>

      <form>
        {/* assignment Name */}
        <div className="mb-3">
          <label htmlFor="assignmentName" className="form-label">
            Assignment Name
          </label>
          <input
            type="text"
            className="form-control"
            id="assignmentName"
            value={assignmentName}
            defaultValue={assignment ? assignment.title : ""}
            onChange={(e) => setAssignmentName(e.target.value)}
          />
        </div>

        {/* description */}
        <div className="mb-3">
          <label htmlFor="assignmentDescription" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="assignmentDescription"
            rows={3}
            placeholder="Description here..."
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* smaller container */}
        <div className="container" style={smallContainerStyle}>
          {/* points */}
          <div className="mb-3">
            <label htmlFor="points" className="form-label">
              Points
            </label>
            <input
              type="number"
              className="form-control"
              id="points"
              defaultValue={assignment ? assignment.points : ""}
              onChange={(e) => setPoints(e.target.value)}
            />
          </div>

          {/* due date */}
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              defaultValue={assignment ? assignment.dueDate : ""}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* available from date */}
          <div className="mb-3">
            <label htmlFor="availableFromDate" className="form-label">
              Available From
            </label>
            <input
              type="date"
              className="form-control"
              id="availableFromDate"
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* available until */}
          <div className="mb-3">
            <label htmlFor="availableUntil" className="form-label">
              Available Until
            </label>
            <input
              type="date"
              className="form-control"
              id="availableUntil"
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        {/* cancel & save */}
        <div
          className="d-flex justify-content-end"
          style={{ marginLeft: "auto", padding: 5 }}>

          {/* cancel */}
          <button onClick={handleCancel}
            style={{ marginRight: 10 }}
            type="button"
            className="btn btn-outline-secondary btn-custom">
            Cancel
          </button>

          {/* save button */}
          <button onClick={handleSave}
            type="button"
            className="btn btn-outline-secondary btn-custom-module">
            Save
          </button>
          <br />
        </div>
      </form>
    </div>
  );
}

export default AssignmentEditor;
