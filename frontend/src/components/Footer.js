/**
 * Footer Component — Dark Theme
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-icon">⚡</span>
              <span className="logo-text">Event<span className="logo-accent">Vibe</span></span>
            </Link>
            <p className="footer-desc">
              Your gateway to unforgettable virtual experiences. Discover, book, and enjoy events from anywhere.
            </p>
            <div className="footer-social">
              <span className="social-link" role="img" aria-label="Instagram">📸</span>
              <span className="social-link" role="img" aria-label="Twitter">🐦</span>
              <span className="social-link" role="img" aria-label="Facebook">👤</span>
              <span className="social-link" role="img" aria-label="LinkedIn">💼</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <Link to="/events" className="footer-link">Browse Events</Link>
            <Link to="/contact" className="footer-link">Contact Us</Link>
            <Link to="/login" className="footer-link">Sign In</Link>
            <Link to="/register" className="footer-link">Create Account</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Categories</h4>
            <Link to="/events" className="footer-link">Music</Link>
            <Link to="/events" className="footer-link">Technology</Link>
            <Link to="/events" className="footer-link">Sports</Link>
            <Link to="/events" className="footer-link">Comedy</Link>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Support</h4>
            <Link to="/contact" className="footer-link">Help Center</Link>
            <Link to="/contact" className="footer-link">FAQs</Link>
            <span className="footer-link">Terms of Service</span>
            <span className="footer-link">Privacy Policy</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} EventVibe. All rights reserved.</p>
          <p className="footer-tagline">Made with <span className="heart">♥</span> for event lovers</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
