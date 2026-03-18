/**
 * Homepage — Hero, Categories, Featured Events, How It Works, CTA
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventService from '../services/eventService';
import EventCard from '../components/EventCard';
import './Homepage.css';

const CATEGORY_ICONS = {
  Music: '🎵',
  Technology: '💻',
  Sports: '⚽',
  Comedy: '😂',
  Art: '🎨',
  Theater: '🎭',
  Workshop: '🔧',
  Conference: '🎤',
  Gaming: '🎮',
  Networking: '🤝',
};

const Homepage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, catRes] = await Promise.all([
          eventService.getAllEvents({ sortBy: 'date_asc' }),
          eventService.getCategories(),
        ]);
        setFeaturedEvents(eventsRes.events?.slice(0, 3) || []);
        setCategories(catRes.categories || []);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-particles"></div>
        </div>
        <div className="container hero-content">
          <p className="section-label">THE FUTURE OF EVENTS</p>
          <h1 className="hero-title">
            Experience Events<br />
            <span className="text-accent">Like Never Before</span>
          </h1>
          <p className="hero-subtitle">
            Discover, book, and enjoy the most exciting virtual events from
            world-class organizers. Your next unforgettable experience is just a
            click away.
          </p>
          <div className="hero-buttons">
            <Link to="/events" className="btn btn-primary btn-lg">
              Explore Events
            </Link>
            <a href="#how-it-works" className="btn btn-outline btn-lg">
              Learn More
            </a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">500+</span>
              <span className="stat-text">Events Hosted</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">50K+</span>
              <span className="stat-text">Tickets Sold</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">100+</span>
              <span className="stat-text">Organizers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <p className="section-label">BROWSE BY CATEGORY</p>
          <h2 className="section-title">Find Your Vibe</h2>
          <div className="categories-grid">
            {categories.length > 0
              ? categories.map((cat) => (
                  <Link
                    to={`/events`}
                    key={cat}
                    className="category-card"
                  >
                    <span className="category-icon">
                      {CATEGORY_ICONS[cat] || '🎪'}
                    </span>
                    <span className="category-name">{cat}</span>
                  </Link>
                ))
              : ['Music', 'Technology', 'Sports', 'Comedy', 'Art', 'Theater'].map(
                  (cat) => (
                    <Link
                      to={`/events`}
                      key={cat}
                      className="category-card"
                    >
                      <span className="category-icon">
                        {CATEGORY_ICONS[cat]}
                      </span>
                      <span className="category-name">{cat}</span>
                    </Link>
                  )
                )}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="featured-section">
        <div className="container">
          <p className="section-label">DON'T MISS OUT</p>
          <h2 className="section-title">Featured Events</h2>
          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading events...</p>
            </div>
          ) : featuredEvents.length > 0 ? (
            <div className="featured-grid">
              {featuredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <p className="no-events-text">No events available yet. Check back soon!</p>
          )}
          <div className="featured-cta">
            <Link to="/events" className="btn btn-outline">
              View All Events →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <p className="section-label">HOW IT WORKS</p>
          <h2 className="section-title">Simple Steps to Your Next Event</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <div className="step-icon">🔍</div>
              <h3 className="step-title">Browse Events</h3>
              <p className="step-desc">
                Explore our curated selection of virtual events across
                multiple categories and find what excites you.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">02</div>
              <div className="step-icon">🎟️</div>
              <h3 className="step-title">Select Tickets</h3>
              <p className="step-desc">
                Choose your preferred ticket tier, select the quantity,
                and add them to your cart with one click.
              </p>
            </div>
            <div className="step-card">
              <div className="step-number">03</div>
              <div className="step-icon">🎉</div>
              <h3 className="step-title">Enjoy the Show</h3>
              <p className="step-desc">
                Get instant access to your tickets, join the event at
                the scheduled time, and enjoy an unforgettable experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Experience<br />
              <span className="text-accent">Something Amazing?</span>
            </h2>
            <p className="cta-subtitle">
              Join thousands of event-goers and discover your next favorite experience.
            </p>
            <Link to="/events" className="btn btn-primary btn-lg">
              Browse All Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
