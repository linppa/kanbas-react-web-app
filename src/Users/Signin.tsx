import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";

export default function Signin() {
    const [credentials, setCredentials] = useState<User>({
        _id: "",
        username: "", password: "", firstName: "", lastName: "", role: "USER"
    });
    const navigate = useNavigate();
    const signin = async () => {
        await client.signin(credentials);
        navigate("/Kanbas/Account/Profile");
    };
    return (
        <div style={{ margin: 20 }}>
            <h1>Signin</h1>
            <input value={credentials.username} onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })}
                className="form-control" placeholder="Username"
                style={{ width: 200 }} />
            <input value={credentials.password} onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })}
                className="form-control" type="password" placeholder="Password"
                style={{ width: 200 }} />
            <button onClick={signin} className="btn btn-primary" style={{ width: 200, marginLeft: 0 }}>
                Signin
            </button>< br />

            <br /><br />
            <h1>Signup</h1>
            <button onClick={() => navigate("/Kanbas/Account/Signup")} className="btn btn-primary" style={{ width: 200, marginLeft: 0 }}>
                Signup
            </button>

        </div>
    );
}
