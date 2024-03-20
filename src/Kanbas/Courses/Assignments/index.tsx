import AssignmentList from "./assignmentList";
import { FaPlus, FaEllipsisV } from "react-icons/fa";


function Assignments() {
  return (
    <div>
      <div className="d-flex justify-content-between mb-3" style={{ padding: "10px" }}>
        <input
          type="search"
          className="form-control btn-custom-searchbar"
          placeholder="Search for Assignments"
        />
        <div>
          <button className="btn btn-outline-secondary btn-custom">
            <FaPlus /> Group
          </button>

          {/* add assignment button */}
          <button className="btn btn-outline-secondary btn-custom-module">
            <FaPlus /> Assignment
          </button>

          <button className="btn btn-outline-secondary btn-custom-ellipses">
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <hr className="horizontal-line"></hr>

      {/* ASSIGNMENT LIST */ }
      <AssignmentList />
    </div>
  );
}
export default Assignments;