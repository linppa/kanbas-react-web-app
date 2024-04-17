import React, { useEffect, useState } from "react";
import "./modules.css";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlusCircle,
  FaPlus,
  FaCrosshairs,
  FaFileImport,
  FaFileExport,
} from "react-icons/fa";
import { useParams } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules
} from "./reducer";
import * as client from "./client";
import { KanbasState } from "../../store";


function ModuleList() {
  const { courseId } = useParams();

  useEffect(() => {
    client.findModulesForCourse(courseId ?? "")
      .then((modules) => dispatch(setModules(modules)));
  }, [courseId]);

  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();

  const [selectedModule, setSelectedModule] = useState(moduleList[0]);

  // handle update module
  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  // handle add module to server
  const handleAddModule = () => {
    client.createModule(courseId ?? "", module).then((module) => {
      dispatch(addModule(module));
    });
  };

  // handle delete module from server
  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  return (
    <>
      {/* action buttons */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-outline-secondary btn-custom mr-2"><FaFileImport /> Collapse All</button>
        <button className="btn btn-outline-secondary btn-custom mr-2"><FaFileExport /> View Progress</button>
        <button className="btn btn-outline-secondary btn-custom mr-2"><FaCrosshairs /> Publish All</button>
        <button className="btn btn-outline-secondary btn-custom-module mr-2"
          onClick={handleAddModule}><FaPlus /> Module</button>
        <button className="btn btn-outline-secondary btn-custom-ellipses"><FaEllipsisV /></button>
      </div>
      <hr className="horizontal-line"></hr>

      {/* FORM TO ADD MODULE */}
      <ul className="list-group wd-modules">
        <li className="list-group-item module-form-container">

          {/* add module button */}
          <button className="btn btn-success add"
            onClick={handleAddModule}>
            Add</button>

          {/* update module button */}
          <button className="btn btn-primary update"
            onClick={handleUpdateModule}>
            Update
          </button>

          {/* input module name */}
          <input className="module-input" value={module.name}
            onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))
            } />

          {/* add module description */}
          <textarea className="module-textarea" value={module.description}
            onChange={(e) => dispatch(setModule({ ...module, description: e.target.value }))
            } />
        </li>

        {/* list existing modules */}
        {moduleList
          .filter((module) => module.course === courseId)
          .map((module, index) => (
            <li key={index} className="list-group-item">
              {/* edit button */}
              <button className="btn btn-success edit"
                onClick={() => dispatch(setModule(module))}>
                Edit
              </button>

              {/* delete button */}
              <button className="btn btn-danger delete"
                onClick={(event) => {
                  event.preventDefault();
                  // warning message before deleting
                  const confirmation = window.confirm("Are you sure you want to delete module?");
                  if (confirmation) {
                    handleDeleteModule(module._id);
                  }
                }}>
                Delete
              </button>

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
              {selectedModule && selectedModule?._id === module._id && (
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