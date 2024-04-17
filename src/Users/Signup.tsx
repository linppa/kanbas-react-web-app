import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
    const [error, setError] = useState("");
    const [user, setUser] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(user);
            navigate("/Kanbas/Account/Profile");
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };
    return (
        <div style={{ margin: 20 }}>
            <h1>Signup</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <input value={user.username} onChange={(e) =>
                setUser({ ...user, username: e.target.value })}
                className="form-control" placeholder="Username"
                style={{ width: 200 }} />
            <input value={user.password} onChange={(e) =>
                setUser({ ...user, password: e.target.value })}
                className="form-control" type="password" placeholder="Password"
                style={{ width: 200 }} />
            <button onClick={signup} className="btn btn-primary" style={{ width: 200, marginLeft: 0 }}>
                Signup
            </button>

            <br /><br />
            <h1>Signin</h1>
            <button onClick={() => navigate("/Kanbas/Account/Signin")} className="btn btn-primary" style={{ width: 200, marginLeft: 0 }}>
                Signin
            </button>
        </div>
    );
}