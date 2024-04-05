import EncodingParametersInURLs from "./EncodingParametersInURLs";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";

const API_BASE = process.env.REACT_APP_API_BASE;

function Assignment5() {
    return (
        <div style={{ paddingLeft: "15px" }}><br />
            <h1>Assignment 5</h1>
            <a href={`${API_BASE}/a5/welcome`}>
                Welcome
            </a><br /><hr />

            <h1 style={{ marginTop: 10 }}>Labs</h1><br />
            <EncodingParametersInURLs /><br /><br />
            <WorkingWithObjects /><br /><br />
            <WorkingWithArrays /><br /><br />
        </div>
    );
}
export default Assignment5;
