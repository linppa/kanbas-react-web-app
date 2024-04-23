import React, { useState, useEffect } from "react";
import * as client from "./client";
import { useNavigate } from "react-router-dom";
import { BsTrash3Fill, BsPlusCircleFill, BsPencil, BsFillCheckCircleFill } from "react-icons/bs";

export default function UserTable() {
    const [users, setUsers] = useState<client.User[]>([]);

    const [user, setUser] = useState<client.User>({
      _id: "", username: "", password: "", firstName: "",
      lastName: "", role: "USER" }); 

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    const createUser = async () => {
      try {
        const newUser = await client.createUser(user);
        setUsers([newUser, ...users]);
        // Makes it easier to create another user, empty the form
        setUser({
        _id: "", username: "", password: "", firstName: "",
        lastName: "", role: "USER"
        });
      } catch (err) {
        alert("Error creating user, please try again!")
      }
      };
    useEffect(() => { fetchUsers(); }, []);
    
    const deleteUser = async (user: client.User) => {
        try {
          await client.deleteUser(user);
          setUsers(users.filter((u) => u._id !== user._id));
        } catch (err) {
          console.log(err);
        }
      };

    const [role, setRole] = useState("USER");

    const fetchUsersByRole = async (role: string) => {
      const users = await client.findUsersByRole(role);
      setRole(role);
      setUsers(users);
    };

    const selectUser = async (user: client.User) => {
      try {
        const u = await client.findUserById(user._id);
        setUser(u);
        setUpdating(true);
      } catch (err) {
        console.log(err);
      }
    };

    const [updating, setUpdating] = useState(false);
    const navigate = useNavigate();

    const updateUser = async () => {
      try {
        const status = await client.updateUser(user);
        setUsers(users.map((u) =>
          (u._id === user._id ? user : u)));
      } catch (err) {
        console.log(err);
      }
    };
  
    
    
  return (
    <div style={{padding: "20px"}} >
      {/* Filter based on Role */}
        <select
        onChange={(e) => fetchUsersByRole(e.target.value)}
        value={role || "USER"}
        className="form-control w-25 float-end">
        <option value=" ">All</option>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <label 
      style={{marginRight: "10px", marginTop: "10px"}}
      className="float-end">Filter by Role: </label>
      <h1>User Table</h1>
      < br />
      <table className="table table-bordered table-striped table-hover"
      >
        <thead>
          {/* Heading bar */}
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <thead>
        <tr>
          {/* Form for adding User */}
                <td>
                  <input 
                  style={{width: "80px", marginRight: "10px"}}
                  placeholder="Username"
                  value={user.password} onChange={(e) =>
                  setUser({ ...user, password: e.target.value })}/>
                  <input 
                  style={{width: "80px"}}
                  placeholder="Password"
                  value={user.username} onChange={(e) =>
                  setUser({ ...user, username: e.target.value })}/>
                </td>
                <td>
                  <input
                  style={{width: "150px"}} 
                  placeholder="First Name"
                  value={user.firstName} onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })}/>
                </td>
                <td>
                  <input 
                  style={{width: "150px"}}
                  placeholder="Last Name"
                  value={user.lastName} onChange={(e) =>
                  setUser({ ...user, lastName: e.target.value })}/>
                </td>
                <td>
                  <select value={user.role} onChange={(e) =>
                  setUser({ ...user, role: e.target.value })}>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="STUDENT">Student</option>
                  </select>
                </td>
                <td style={{ display: "flex", marginTop:"15px"}}>
                  {/* Update User */}
                  {updating ? (
                  <>
                  {/* Update Button */}
                    <button
                    className="btn"
                    style={{ padding: "0px" }}
                    onClick={() => {
                      updateUser();
                      setUpdating(false);
                      setUser({
                        _id: "", username: "", password: "", firstName: "",
                        lastName: "", role: "USER"
                      });
                    }}
                    >
                    <BsFillCheckCircleFill className="text-success fs-1 text" />
                    </button>
                    {/* Cancel Update */}
                    <button
                      className="btn btn-secondary"
                      style={{ marginLeft: "5px" }}
                      onClick={() => {
                        setUpdating(false);
                        setUser({
                          _id: "", username: "", password: "", firstName: "",
                          lastName: "", role: "USER"
                        });
                      }}
                    > Cancel
                    </button>
                  </>
                  ) : (
                  // Create user, plus sign
                  <button
                    className="btn"
                    style={{ padding: "0px" }}
                    onClick={createUser}
                  >
                    <BsPlusCircleFill className="text-success fs-1 text" />
                  </button>
                  )}
                </td>
          </tr>
        </thead>
        {/* Table for the user database */}
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
                <td>{user.role}</td>
                {/* Side bar of buttons */}
                <td style={{ display: "flex"}}>
                  {/* Edit User */}
                <button className="btn btn-warning me-2"
                  onClick={() => {
                  setUpdating(true);}}>
                  <BsPencil onClick={() => selectUser(user)}/>
                </button>
                  {/* Delete User */}
                <button 
                className="btn btn-danger"
                onClick={() => deleteUser(user)}>
                  <BsTrash3Fill />
                </button>
              </td>
            </tr>))}
        </tbody>
      </table>
      {/* Cancel Button, go to profile screen */}
      <button
      className="btn btn-secondary"
      style={{ marginLeft: "5px" }}
      onClick={() => navigate("/Kanbas/Account/Profile")}>
        Cancel
      </button>
    </div>
  );
}
