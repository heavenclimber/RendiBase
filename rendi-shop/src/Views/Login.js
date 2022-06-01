import React from "react";

import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()

    const handleSubmit = event => {
        event.preventDefault();
        navigate('/home')
    }

    
  return (
    <div className="logincontainer">
      <div
        style={{
          flex: 1,
          maxWidth: 800,
          background: "#d8f9ff",
          padding: 30,
          borderRadius: 10,
          margin: "auto",
        }}
      >
        <form style={{}}   onSubmit={handleSubmit}>
          <h3>Sign In</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="mb-3"></div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary" 
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
