import React from "react";
import { useParams } from "react-router-dom";
import { assignments } from "../../../Database";
import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";

function AssignmentEditor() {
  const { assignmentId } = useParams();
  const assignment = assignments.find((a) => a._id === assignmentId);

  const smallContainerStyle = {
    maxWidth: "70%",
    margin: "0 auto",
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
            defaultValue={assignment ? assignment.title : ""}
            readOnly
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
            readOnly
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
              readOnly
            />
          </div>

          {/* assignment group drop-down*/}
          <div className="mb-3">
            <label className="form-label">Assignment Group</label>
            <select className="form-select" id="assignmentGroup">
              <option> </option>
              <option>Group 1</option>
              <option>Group 2</option>
              <option>Group 3</option>
            </select>
          </div>

          {/* display grade as, drop down */}
          <div className="mb-3">
            <label className="form-label">Display Grade As</label>
            <select className="form-select" id="displayGradeAs">
              <option>Percentage</option>
              <option>Points</option>
              <option>Complete/Incomplete</option>
            </select>
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
              readOnly
            />
            </div>

        </div>

        {/* cancel & save */}
        <div
          className="d-flex justify-content-end"
          style={{ marginLeft: "auto", padding: 5 }}
        >
          <button style={{ marginRight: 10 }}
            type="button"
            className="btn btn-outline-secondary btn-custom"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-custom-module"
          >
            Save
          </button>
          <br />
          
        </div>
      </form>
    </div>
  );
}

export default AssignmentEditor;
