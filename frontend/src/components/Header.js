/**
 * Navigation Header Component — Dark Theme
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Event<span className="logo-accent">Vibe</span></span>
          </Link>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}></span>
          </button>

          <div className={`nav-center ${mobileMenuOpen ? 'open' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/events" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Events
            </Link>
            <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>

            {isAuthenticated && (
              <>
                <Link to="/cart" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  🛒 Cart
                </Link>
                <Link to="/my-tickets" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  🎟️ My Tickets
                </Link>
              </>
            )}

            {user?.isAdmin && (
              <Link to="/admin" className="nav-link admin-link" onClick={() => setMobileMenuOpen(false)}>
                ⚙️ Admin
              </Link>
            )}
          </div>

          <div className="nav-right">
            {isAuthenticated ? (
              <>
                <span className="user-name">👤 {user?.name}</span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/events" className="btn btn-primary btn-sm">
                  Get Tickets
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
