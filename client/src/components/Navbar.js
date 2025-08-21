import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Wedding Adda 💍</h1>
      <ul className="nav-links">
  <li><Link to="/">Home</Link></li>
  <li><Link to="/addvenue">Add Venue</Link></li>
  <li><Link to="/viewvenues">View Venues</Link></li>
  <li><Link to="/login">Login</Link></li>
  <li><Link to="/register">Register</Link></li>
</ul>

    </nav>
  );
}

export default Navbar;
