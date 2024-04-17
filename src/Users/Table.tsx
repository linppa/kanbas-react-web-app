import React, { useState, useEffect } from "react";
import {
    BsTrash3Fill, BsPlusCircleFill,
    BsPencil, BsFillCheckCircleFill
} from "react-icons/bs";
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

    const deleteUser = async (user: User) => {
        try {
            await client.deleteUser(user);
            setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
            console.log(err);
        }
    };

    const selectUser = async (user: User) => {
        try {
            const u = await client.findUserById(user._id);
            setUser(u);
        } catch (err) {
            console.log(err);
        }
    };
    const updateUser = async () => {
        try {
            const status = await client.updateUser(user);
            setUsers(users.map((u) =>
                (u._id === user._id ? user : u)));
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    const [role, setRole] = useState("USER");
    const fetchUsersByRole = async (role: string) => {
        const users = await client.findUsersByRole(role);
        setRole(role);
        setUsers(users);
    };

    useEffect(() => { fetchUsers(); }, []);

    return (
        <div style={{ margin: 20 }}>
            <select onChange={(e) => fetchUsersByRole(e.target.value)}
            value={ role || "USER" } 
            className="form-control w-25 float-end" style={{ width: 200 }}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </select>

            <h1>User Table</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>&nbsp;</th>
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
                        {/* update & add user, green icons */}
                        <td className="text-nowrap">
                            <BsFillCheckCircleFill
                                onClick={updateUser}
                                style={{ color: "green", fontSize: 30, cursor: "pointer", marginBottom: 5, marginLeft: 10 }}
                            />
                            <BsPlusCircleFill onClick={createUser}
                                style={{ color: "green", fontSize: 30, cursor: "pointer", marginBottom: 5, marginLeft: 18 }} />
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
                            {/* delete & edit icons */}
                            <td className="text-nowrap">
                                <button onClick={() => deleteUser(user)}
                                    className="btn btn-danger">
                                    <BsTrash3Fill />
                                </button>
                                <button onClick={() => selectUser(user)}
                                    className="btn btn-warning">
                                    <BsPencil />
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        </div>
    );
}
