import React, { useState } from "react";
import "./modules.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";

function ModuleList() {
  const { courseId } = useParams();
  const modulesList = modules.filter((module) => module.course === courseId);
  const [selectedModule, setSelectedModule] = useState(modulesList[0]);

  const [moduleList, setModuleList] = useState<any[]>(modules);
  const [module, setModule] = useState({
    _id: "0",
    name: "New Module",
    description: "New Description",
    course: courseId || "",
  });
  const addModule = (module: any) => {
    const newModule = { ...module,
      _id: new Date().getTime().toString() };
    const newModuleList = [newModule, ...moduleList];
    setModuleList(newModuleList);
  };

  return (
    <>
      {/* add modules list */}
      <ul className="list-group wd-modules">
        <li className="module-form-container">
          {/* add module button */}
          <button className="btn btn-success add" onClick={() => { addModule(module) }}>Add</button>
          <input className="module-input" value={module.name}
            onChange={(e) => setModule({
              ...module, name: e.target.value
            })}
          />
          {/* add module description */}
          <textarea className="module-textarea" value={module.description}
            onChange={(e) => setModule({
              ...module, description: e.target.value
            })}
          />
        </li>

        {/* list existing modules */}
        {moduleList
          .filter((module) => module.course === courseId)
          .map((module, index) => (
            <li key={index} className="list-group-item">

              {/* check, plus, elips icons */}
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>

              {/* list lessons */}
              {selectedModule._id === module._id && (
                <ul className="list-group">
                  {module.lessons?.map((lesson: any, index: any) => (
                    <li className="list-group-item" key={index}>
                      <FaEllipsisV className="me-2" />
                      {lesson.name}
                      <span className="float-end">
                        <FaCheckCircle className="text-success" />
                        <FaEllipsisV className="ms-2" />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </>
  );
}
export default ModuleList;