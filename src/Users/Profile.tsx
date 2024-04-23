import React from "react";
import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
    const [profile, setProfile] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        role: "USER"
    });
    const navigate = useNavigate();
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    const save = async () => {
        await client.updateUser(profile);
        alert("Saved successfully!");
      };
    
    const signout = async () => {
        const confirmSignout = window.confirm("Are you sure you want to sign out?");
        if (confirmSignout) {
            await client.signout();
            alert("Signed out successfully!");
            navigate("/Kanbas/Account/Signin");
        }
    };
      
    //   Style for the input fields
    const inputStyle = {
        width: "85%",
        padding: "10px",
        margin: "10px",
        marginTop: "5px"
    };
    //  Style for the labels
    const labelStyle = {
        fontWeight: "bold",
        marginLeft: "10px",
        fontSize: "17px"
    };

    return (
        <div style={{padding: "15px"}}>
            <h1>Profile</h1>
            <br />
            {profile.role === "ADMIN" && (
                        <Link
                        style={{ margin: "10px", width: "70%"}}
                            to="/Kanbas/Account/Admin/Users"
                            className="btn btn-warning w-95"
                        >
                            See All Users
                        </Link>
                    )}
            {profile && (
                <div>
                    {/* Username */}
                    <label style={labelStyle}>Username:</label>
                    <input
                        className="form-control"
                        style={inputStyle}
                        value={profile.username}
                        onChange={(e) =>
                            setProfile({ ...profile, username: e.target.value })
                        }
                    />
                    {/* Password */}
                    <label style={labelStyle}>Password</label>
                    <input
                        style={inputStyle}
                        className="form-control"
                        value={profile.password}
                        onChange={(e) =>
                            setProfile({ ...profile, password: e.target.value })
                        }
                    />
                    {/* First Name */}
                    <label style={labelStyle}>First Name</label>
                    <input
                        className="form-control"
                        style={inputStyle}
                        value={profile.firstName}
                        onChange={(e) =>
                            setProfile({ ...profile, firstName: e.target.value })
                        }
                    />
                    {/* Last Name */}
                    <label style={labelStyle}>Last Name</label>
                    <input
                        className="form-control"
                        style={inputStyle}
                        value={profile.lastName}
                        onChange={(e) =>
                            setProfile({ ...profile, lastName: e.target.value })
                        }
                    />
                    {/* Date of Birth */}
                    <label style={labelStyle}>Date of Birth</label>
                    <input
                        className="form-control"
                        style={inputStyle}
                        value={profile.dob}
                        type="date"
                        onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                    />
                    {/* Email */}
                    <label style={labelStyle}>Email</label>
                    <input
                        className="form-control"
                        style={inputStyle}
                        value={profile.email}
                        onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                        }
                    />
                    {/* Role */}
                    <label style={labelStyle}>Role</label>
                    <select
                        className="form-control"
                        style={inputStyle}
                        value={profile.role}
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    {/* Save Button */}
                    <button
                        className="btn btn-primary"
                        style={{ margin: "10px" }}
                        onClick={save}
                    >
                        Save
                    </button>
                    {/* Cancel Button */}
                    <button
                        className="btn btn-danger"
                        style={{ margin: "10px" }}
                        onClick={signout}>
                        Signout
                    </button>
                </div>
            )}
        </div>
    );
}