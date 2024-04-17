import React, { useState, useEffect } from "react";
import { BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "./client";
import { User } from "./client";

export default function UserTable() {
    const [users, setUsers] = useState<User[]>([]);

    const [user, setUser] = useState<User>({
        _id: "", username: "", password: "", firstName: "",
        lastName: "", role: "USER"
    });
    const createUser = async () => {
        try {
            const newUser = await client.createUser(user);
            setUsers([newUser, ...users]);
        } catch (err) {
            console.log(err);
        }
    };


    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => { fetchUsers(); }, []);
    return (
        <div>
            <h1>User Table</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                    </tr>

                    <tr>
                        <td>
                            {/* username */}
                            <input value={user.username} onChange={(e) =>
                                setUser({ ...user, username: e.target.value })}
                                className="form-control" placeholder="Username"
                                style={{ width: 200 }} />

                            {/* password */}
                            <input value={user.password} onChange={(e) =>
                                setUser({ ...user, password: e.target.value })}
                                className="form-control" type="password" placeholder="Password"
                                style={{ width: 200 }} />
                        </td>
                        <td>
                            <input value={user.firstName} onChange={(e) =>
                                setUser({ ...user, firstName: e.target.value })}
                                className="form-control" placeholder="First Name"
                                style={{ width: 200 }} />
                        </td>
                        <td>
                            <input value={user.lastName} onChange={(e) =>
                                setUser({ ...user, lastName: e.target.value })}
                                className="form-control" placeholder="Last Name"
                                style={{ width: 200 }} />
                        </td>
                        <td>
                            <select value={user.role} onChange={(e) =>
                                setUser({ ...user, role: e.target.value })}
                                className="form-control" style={{ width: 200 }}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="STUDENT">Student</option>
                            </select>
                        </td>
                        <td>
                            <BsPlusCircleFill onClick={createUser}
                                style={{ color: "green", fontSize: 30, cursor: "pointer", marginBottom: 5 }} />
                        </td>
                    </tr>

                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.role}</td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    );
}
