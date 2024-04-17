import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
export default function Profile() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: "USER"
    });

    const navigate = useNavigate();

    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile({ ...account, password: "" });
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    const save = async () => {
        await client.updateUser(profile);
    };

    const signout = async () => {
        await client.signout();
        navigate("/Kanbas/Account/Signin");
    };



    return (
        <div style={{ margin: 20 }}>
            <h1>Profile</h1>
            {profile && (
                <div>
                    {/* users button */}
                    <Link to="/Kanbas/Account/Admin/Users"
                        className="btn btn-warning"
                        style={{ width: 200, marginLeft: 0, marginBottom: 5 }}>
                        Users
                    </Link>

                    {/* username */}
                    <input value={profile.username} onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })}
                        className="form-control" placeholder="Username"
                        style={{ width: 200 }} />

                    {/* password */}
                    <input value={profile.password} onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })}
                        className="form-control" type="password" placeholder="Password"
                        style={{ width: 200 }} />

                    {/* first name */}
                    <input value={profile.firstName} onChange={(e) =>
                        setProfile({ ...profile, firstName: e.target.value })}
                        className="form-control" placeholder="First Name"
                        style={{ width: 200 }} />

                    {/* last name */}
                    <input value={profile.lastName} onChange={(e) =>
                        setProfile({ ...profile, lastName: e.target.value })}
                        className="form-control" placeholder="Last Name"
                        style={{ width: 200 }} />

                    {/* dob */}
                    <input value={profile.dob} type="date" onChange={(e) =>
                        setProfile({ ...profile, dob: e.target.value })}
                        className="form-control" style={{ width: 200 }} />

                    {/* email */}
                    <input value={profile.email} onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })}
                        className="form-control" placeholder="Email"
                        style={{ width: 200 }} />

                    {/* role */}
                    <select onChange={(e) =>
                        setProfile({ ...profile, role: e.target.value })}
                        className="form-control" style={{ width: 200 }}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>

                    {/* save button */}
                    <button onClick={save}
                        className="btn btn-primary"
                        style={{ width: 200, marginLeft: 0, marginTop: 5 }}>
                        Save
                    </button>< br />
                    {/* signout button */}
                    <button onClick={signout}
                        className="btn btn-danger"
                        style={{ width: 200, marginLeft: 0, marginTop: 5 }}>
                        Signout
                    </button>
                </div>
            )
            }
        </div>
    );
}
