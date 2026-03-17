import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api/posts";
import "./App.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (name && email && password) {
      try {
        const response = await api.post("/users/register", { name, email, password });
        localStorage.setItem("user", response.data.user.email);
        navigate("/account");
      } catch (err) {
        setError(err.response?.data?.msg || "Registration failed");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Create Account</h2>
        {error && <p style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Name"
            className="login-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            Register
          </button>
        </form>
        <p className="login-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
