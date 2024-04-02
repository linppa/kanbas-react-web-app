import React, { useState } from "react";

function EncodingParametersInURLs() {
    const [a, setA] = useState(34);
    const [b, setB] = useState(23);

    return (
        <div>
            {/* 3.1.1 path parameters */}
            <h3> Encoding Parameters in URLs </h3>
            <h4> Calculator </h4>
            <input className="form-control" type="number" value={a}
                onChange={(e) => setA(Number(e.target.value))} />
            <input className="form-control" type="number" value={b}
                onChange={(e) => setB(Number(e.target.value))} />

            <h3> Path Parameters </h3>
            {/* add */}
            <a href={`http://localhost:4000/a5/add/${a}/${b}`}>
                <button className="btn btn-primary"> Add {a} + {b} </button>
            </a>
            {/* subtract */}
            < a href={`http://localhost:4000/a5/subtract/${a}/${b}`}>
                <button className="btn btn-danger"> Subtract {a} - {b} </button>
            </a>
            {/* multiply */}
            < a href={`http://localhost:4000/a5/multiply/${a}/${b}`}>
                <button className="btn btn-warning" style={{ marginRight: 5}}> Multiply {a} * {b} </button>
            </a>
            {/* divide */}
            < a href={`http://localhost:4000/a5/divide/${a}/${b}`}>
                <button className="btn btn-success"> Divide {a} / {b} </button>
            </a>

            {/* 3.1.2 query parameters */}
            <h3> Query Parameters </h3>
            {/* add */}
            <a className="btn btn-primary"
                href={`http://localhost:4000/a5/calculator?operation=add&a=${a}&b=${b}`}>
                Add {a} + {b}
            </a>
            {/* subtract */}
            <a className="btn btn-danger"
                href={`http://localhost:4000/a5/calculator?operation=subtract&a=${a}&b=${b}`}>
                Subtract {a} - {b}
            </a>
            {/* multiply */}
            <a className="btn btn-warning" style={{ marginRight: 5}}
                href={`http://localhost:4000/a5/calculator?operation=multiply&a=${a}&b=${b}`}>
                Multiply {a} * {b}
            </a>
            {/* divide */}
            <a className="btn btn-success"
                href={`http://localhost:4000/a5/calculator?operation=divide&a=${a}&b=${b}`}>
                Divide {a} / {b}
            </a>

        </div>
    );
}
export default EncodingParametersInURLs;