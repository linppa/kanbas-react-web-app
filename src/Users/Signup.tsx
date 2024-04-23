import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const signup = async () => {
    try {
        await client.signup(user);
        navigate("/Kanbas/Account/Profile");
        alert("Signed up successfully!");
    } catch (err) {
        setError("Error signing up, please try again!");
    }
  };
  return (
    <div style={{padding:"50px"}}>
      <h1>Signup</h1>
      < br />
      {error && <div>{error}</div>}
    {/* Username */}
        <label style={{padding: "5px", marginLeft: "15px", width: "400px", fontWeight: "bold", fontSize: "19px"}}>Username:</label>
        <input 
        className="form-control"
        style={{padding: "5px", marginLeft: "15px", width: "400px"}}
        onChange={(e) => setUser({
            ...user, username: e.target.value })} />
          < br />
        {/* Password */}
        <label 
        style={{padding: "5px", marginLeft: "15px", width: "400px", fontWeight: "bold", fontSize: "19px"}}>
            Password:</label>
      <input 
        className="form-control"
        style={{padding: "5px", marginLeft: "15px", width: "400px"}}
        value={user.password} 
        type={showPassword ? "text" : "password"}
        onChange={(e) => setUser({
          ...user, password: e.target.value })} />
        {/* Checkbox to Show/Hide Password */}
        <label style={{ marginLeft: "20px" , paddingTop: "10px", paddingBottom: "10px" }}>
          <input 
            type="checkbox" 
            style={{marginRight: "5px"}}
            checked={showPassword} 
            onChange={() => setShowPassword(!showPassword)} 
          />
           Show Password
        </label>
          < br />
    {/* Sign Up Button */}
        <button 
            onClick={signup} 
            className="btn btn-primary"
            style={{padding: "5px", marginLeft: "15px", width: "300px"}}>
        Sign Up
      </button>
      < br />
      < br />
    {/* Cancel Button */}
      <button 
        className="btn btn-secondary"
        style={{padding: "5px", marginLeft: "15px", width: "300px"}}
        onClick={() => navigate("/Kanbas/Account/SignIn")}>
        Cancel
      </button>
    </div>
  );
}
