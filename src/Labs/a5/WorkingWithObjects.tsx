import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkingWithObjects() {
    // 3.2.3 modyfing assignment object in the server
    const [assignment, setAssignment] = useState({
        id: 1,
        title: 'NodeJS Assignment',
        description: 'Create a NodeJS server with ExpressJS',
        due: '2021-10-10',
        completed: false,
        score: 0,
    });
    const API_BASE = process.env.REACT_APP_API_BASE;
    const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`;

    // 3.2.4 module object
    const [module, setModule] = useState({
        id: 1,
        name: 'NodeJS',
        description: 'Learn NodeJS with ExpressJS',
        course: 'Web Development',
    });

    // 3.4.4 fetching & updating objects w axios
    const fetchAssignment = async () => {
        const response = await axios.get(`${ASSIGNMENT_URL}`);
        setAssignment(response.data);
    };
    const updateTitle = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
        setAssignment(response.data);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);

    return (
        <div>
            <h3> Working with Objects </h3>

            {/* ----- ASSIGNMENT OBJECT ----- */}
            <h3> Assignment Object </h3>
            {/* get assignment object */}
            <h4> Retrieving Objects </h4>
            <a href={`${ASSIGNMENT_URL}`}>
                <button className="btn btn-primary"> Get Assignment </button>
            </a>
            {/* get assignment property */}
            <h4> Retrieving Properties </h4>
            <a href={`${API_BASE}/a5/assignment/title`}>
                <button className="btn btn-primary"> Get Assignment Title </button>
            </a>
            {/* change the title of assignment */}
            <h4> Modifying Properties </h4>
            <div style={{ display: 'flex' }}>
                {/* text input for title */}
                <input className="form-control" style={{ width: '30%' }} type="text"
                    onChange={(e) => setAssignment({
                        ...assignment,
                        title: e.target.value
                    })}
                    value={assignment.title} />
                {/* update title button */}
                <button onClick={updateTitle} className="btn btn-primary">
                    Update Assignment Title to: {assignment.title}
                </button>
                <button onClick={fetchAssignment} className="btn btn-primary">
                    Fetch Assignment
                </button>
                
            </div><br /><br />

            {/* ----- MODULE OBJECT ----- */}
            <h3> Module Object </h3>
            {/* get module object */}
            <h4> Retrieving Objects </h4>
            <a href={`${API_BASE}/a5/module`}>
                <button className="btn btn-primary"> Get Module </button>
            </a>
            {/* get module name property */}
            <h4> Retrieving Properties </h4>
            <a href={`${API_BASE}/a5/module/name`}>
                <button className="btn btn-primary"> Get Module Name </button>
            </a>
            {/* change the name of module */}
            <h4> Modifying Properties </h4>
            <div style={{ display: 'flex' }}>
                {/* text input for name */}
                <input className="form-control" style={{ width: '30%' }} type="text"
                    onChange={(e) => setModule({
                        ...module,
                        name: e.target.value
                    })}
                    value={module.name} />
                {/* update name button */}
                <a href={`${API_BASE}/a5/module/name/${module.name}`}>
                    <button className="btn btn-primary"> Update Module Name </button>
                </a>
            </div>
        </div>
    );
}
export default WorkingWithObjects;