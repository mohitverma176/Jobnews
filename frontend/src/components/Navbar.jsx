import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Global.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
        JobNews
      </Link>

      <div className="navbar-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? 'active-nav' : '')}
          end
        >
          Home
        </NavLink>
        <NavLink 
          to="/jobs" 
          className={({ isActive }) => (isActive ? 'active-nav' : '')}
        >
          Jobs
        </NavLink>
        <NavLink 
          to="/news" 
          className={({ isActive }) => (isActive ? 'active-nav' : '')}
        >
          News
        </NavLink>
        <NavLink 
          to="/resume" 
          className={({ isActive }) => (isActive ? 'active-nav' : '')}
        >
          Resume Builder
        </NavLink>
        <select className="language-select" defaultValue="en" aria-label="Select Language">
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="ta">தமிழ்</option>
          <option value="mr">मराठी</option>
        </select>
      </div>
    </nav>
  );
}
