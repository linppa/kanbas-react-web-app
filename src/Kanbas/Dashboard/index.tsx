import { Link } from "react-router-dom";
import "./dashboard.css";

function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
      courses: any[]; course: any; setCourse: (course: any) => void;
      addNewCourse: () => void; deleteCourse: (course: any) => void;
      updateCourse: () => void;
    }) {


  return (
    <div className="p-4">
      <div>
        <h1>Dashboard</h1><hr />
        <h4>Course</h4>
        <input value={course.name} className="form-control"
          onChange={(e) => setCourse({ ...course, name: e.target.value })} />
        <input value={course.number} className="form-control"
          onChange={(e) => setCourse({ ...course, number: e.target.value })} />
        <input value={course.startDate} className="form-control" type="date"
          onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
        <input value={course.endDate} className="form-control" type="date"
          onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
        <input value={course.semester} className="form-control"
          onChange={(e) => setCourse({ ...course, semester: e.target.value })} /><br />

        <button onClick={addNewCourse} className="btn btn-primary">
          Add New Course
        </button>
        <button onClick={updateCourse} className="btn btn-primary">
          Update
        </button>

        <br /><br />
      </div>

      <h2>Published Courses (12)</h2> <hr />
      <div className="row">

        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>

              <div className="card">
                <img src={`/images/${course.image}`} className="card-img-top"
                  style={{ height: 150 }} alt="..." />

                <div className="card-body">
                  <Link className="card-title" to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                    {course.name}
                  </Link>
                  <p className="card-text">{course.number}</p>
                  <br />

                  {/* go button */}
                  <span style={{ float: "left" }}>
                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">
                      Go </Link>
                  </span>

                  <span style={{ float: "right" }}>
                    {/* edit button */}
                    <button className="btn grey" onClick={(event) => {
                      event.preventDefault();
                      setCourse(course);
                    }}>
                      Edit
                    </button>

                    {/* delete button */}
                    <button className="btn btn-danger" onClick={(event) => {
                      event.preventDefault();
                      // warning message before deleting
                      const confirmation = window.confirm("Are you sure you want to delete course?");
                      // if user confirms, delete course
                      if (confirmation) {
                        deleteCourse(course._id);
                      }
                    }}>
                      Delete
                    </button>

                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;