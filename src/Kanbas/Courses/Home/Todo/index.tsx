import React from "react";
import { useParams } from "react-router-dom";
import Assignments from "../../../Database/assignments.json";
import { FaCheckSquare } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function ToDo() {
    const { courseId } = useParams();
    const courseAssignments = Assignments.filter((assignment) => assignment.course === courseId);

    return (
        <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
            <h4>To Do</h4>
            <hr />
            {courseAssignments.map((assignment, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <a href="#" className="link-custom">
                            <FaCheckSquare /> {assignment.title}
                        </a>
                        <FaXmark style={{ color: 'grey' }} />
                    </div>

                    {/* subtext for points and due date */}
                    <div className="subtext-todo">
                        {assignment.course} | {assignment.points} points | Due {assignment.dueDate}
                    </div>

                </div>
            ))}
        </div>
    );
}
export default ToDo;
