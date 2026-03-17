import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/posts"; // Using the configured axios instance
import "./App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (email && password) {
       try {
         const response = await api.post("/users/login", { email, password });
         localStorage.setItem("user", response.data.user.email);
         navigate("/account");
       } catch (err) {
         setError(err.response?.data?.msg || "Login failed");
       }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="login-footer">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;