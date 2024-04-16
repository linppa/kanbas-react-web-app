import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Profile() {
    const [profile, setProfile] = useState({
        username: "", password: "",
        firstName: "", lastName: "", dob: "", email: "", role: "USER"
    });
    const navigate = useNavigate();
    const fetchProfile = async () => {
        const account = await client.profile();
        setProfile(account);
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    return (
        <div>
            <h1>Profile</h1>
            {profile && (
                <div>
                    {/* username */}
                    <input value={profile.username} onChange={(e) =>
                        setProfile({ ...profile, username: e.target.value })} 
                        className="form-control" placeholder="Username" 
                        style={{ width: 200 }} />
                    
                    {/* password */}
                    <input value={profile.password} onChange={(e) =>
                        setProfile({ ...profile, password: e.target.value })}
                        className="form-control" type="password"
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
                </div>
            )}
        </div>
    );
}
