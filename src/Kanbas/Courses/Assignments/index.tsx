import AssignmentList from "./assignmentList";
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
      {/* ASSIGNMENT LIST */}
      <AssignmentList />
    </div>
  );
}
export default Assignments;