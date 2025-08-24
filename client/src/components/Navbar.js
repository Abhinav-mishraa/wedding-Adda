 

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth(); // Get user and logout from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      logout(); // Call logout from AuthContext
      navigate('/'); // Redirect to home page
    }
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Wedding Adda 💍</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/viewvenues">View Venues</Link></li>
        <li><Link to="/AddFeedback">Feedback</Link></li>
        
        {/* Show these links only when user is logged in */}
        {user ? (
          <>
            <li><Link to="/addvenue">Add Venue</Link></li>
            <li className="user-info">
              <span className="welcome-text">Welcome, {user.username || user.email}!</span>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          // Show these links only when user is not logged in
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;