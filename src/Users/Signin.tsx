import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import React from "react";
export default function Signin() {
  const [credentials, setCredentials] = useState<client.User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const signin = async () => {
    try {
      await client.signin(credentials);
      navigate("/Kanbas/Account/Profile");
    } catch (err) {
      alert("Error signing in, please try again!");
    }
  };
  return (
    <div style={{padding: "50px"}}>
      <h1>Signin</h1>
      <br />
      {/* Username Input */}
      <input 
        className="form-control"
        style={{padding: "5px", marginLeft: "15px", width: "400px"}}
        value={credentials.username} 
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        placeholder="Username"
      />
      {/* Password Input */}
      <br />
        <input 
          className="form-control"
          style={{padding: "5px", marginLeft: "15px", width: "400px"}}
          type={showPassword ? "text" : "password"}
          value={credentials.password} 
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="Password"
        />
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
      <br/>
      {/* Sign in Button */}
      <button 
        onClick={signin} 
        className="btn btn-primary"
        style={{padding: "5px", marginLeft: "15px", width: "300px"}}
      >
        Sign In
      </button>
      < br />
      <label style={{ marginLeft: "20px" , paddingTop: "10px", paddingBottom: "10px" }}>
        Don't Have Account?
      </label>
      <br />
      {/* Sign up Button */}
      <button 
        className="btn btn-secondary"
        style={{padding: "5px", marginLeft: "15px", width: "300px"}}
        onClick={() => navigate("/Kanbas/Account/Signup")}>
        Sign Up
      </button>
    </div>
  );
}