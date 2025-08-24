 

import React, { useState } from "react";
import './Auth.css';

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Debug: Log what we're sending
    console.log("Sending registration data:", user);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log("Registration response:", data);
      
      if (response.ok) {
        setMessage("Registration successful! You can now login.");
        // Clear form
        setUser({ username: "", email: "", password: "" });
        // Redirect to login page after successful registration
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setMessage(data.error || "Registration failed. Please try again.");
      }
      
    } catch (err) {
      console.error("Registration error:", err);
      setMessage("Network error. Please check if your server is running.");
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Join Wedding Adda</h1>
          <p>Create your account to get started</p>
        </div>
        
        {message && (
          <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={user.username}
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              value={user.email}
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <input 
              type="password" 
              name="password" 
              placeholder="Password (min 6 chars)" 
              value={user.password}
              onChange={handleChange} 
              required 
              minLength={6}
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="auth-btn"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;