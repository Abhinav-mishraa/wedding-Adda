 
 

 
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Auth.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  const { login } = useAuth();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    console.log("Sending login data:", credentials);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log("Login response:", data);
      
      if (response.ok) {
        login(data.user, data.token);
        setMessage("Login successful! Welcome back.");
        setCredentials({ email: "", password: "" });
        
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setMessage(data.error || "Login failed. Please try again.");
      }
      
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Network error. Please check if your server is running.");
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>
        
        {message && (
          <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              value={credentials.email}
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={credentials.password}
              onChange={handleChange} 
              required 
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="auth-btn"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Create one here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;