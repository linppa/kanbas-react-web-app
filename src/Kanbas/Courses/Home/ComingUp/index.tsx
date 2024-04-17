import React from "react";
import { useParams } from "react-router-dom";
import Modules from "../../../Database/modules.json";
import { FaCalendarDay } from "react-icons/fa";

function ComingUp() {
    const { courseId } = useParams();

    // Filter modules by courseId, then map to get all lessons within those modules
    const comingUpLessons = Modules.filter(module => module.course === courseId)
        .flatMap(module => module.lessons ? module.lessons.map(lesson => ({
            ...lesson,
            moduleName: module.name
        })) : []);

    return (
        <div style={{ paddingTop: '20px', paddingBottom: '100px' }}>
            <h4>Coming Up</h4>
            <hr />
            {comingUpLessons.map((lesson, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <a href="#" className="link-custom">
                            <FaCalendarDay /> {lesson.name}
                        </a>
                    </div>
                    <div className="subtext-coming-up">
                        {courseId} | {lesson.description}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ComingUp;
