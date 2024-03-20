import AssignmentList from "./assignmentList";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { KanbasState } from "../../store";


function Assignments() {
  const { courseId } = useParams();

  const assignment = useSelector((state: KanbasState) =>
    state.assignmentsReducer.assignment
  );

  return (
    <div>
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
            <button className="btn btn-outline-secondary btn-custom-module">
              <FaPlus /> Assignment
            </button>
          </Link>

          <button className="btn btn-outline-secondary btn-custom-ellipses">
            <FaEllipsisV />
          </button>
        </div>
      </div>
      <hr className="horizontal-line"></hr>

      {/* ASSIGNMENT LIST */}
      <AssignmentList />
    </div>
  );
}
export default Assignments;