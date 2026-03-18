/**
 * Contact / Support Page
 */

import React, { useState } from 'react';
import './Contact.css';

const FAQ_DATA = [
  {
    question: 'How do I get a refund?',
    answer: 'You can request a refund within 48 hours of purchase by going to My Tickets, selecting the order, and clicking the Cancel button. Refunds are processed within 5-7 business days.',
  },
  {
    question: 'Can I transfer my ticket?',
    answer: 'Currently, tickets are non-transferable and are tied to the account that purchased them. We are working on adding ticket transfer functionality in a future update.',
  },
  {
    question: 'What if the event is cancelled?',
    answer: 'If an event is cancelled by the organizer, you will receive a full refund automatically. We will notify you via email as soon as the cancellation is confirmed.',
  },
  {
    question: 'How do I access virtual events?',
    answer: 'After purchasing your ticket, go to My Tickets and click on the event. You will find a link or access code to join the virtual event at the scheduled time.',
  },
  {
    question: 'Is my payment information secure?',
    answer: 'Yes! We use 256-bit SSL encryption and never store your full card details. All payments are processed through secure, PCI-compliant payment processors.',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    orderNumber: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', orderNumber: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <div className="contact-header">
          <p className="section-label">SUPPORT</p>
          <h1 className="section-title">
            Get In <span className="text-accent">Touch</span>
          </h1>
          <p className="contact-subtitle">
            Have a question? We're here to help.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="contact-cards">
          <div className="contact-card">
            <span className="contact-card-icon">📧</span>
            <h3>Email Us</h3>
            <p className="contact-card-detail">support@eventvibe.com</p>
            <p className="contact-card-note">Within 24 hours</p>
          </div>
          <div className="contact-card">
            <span className="contact-card-icon">💬</span>
            <h3>Live Chat</h3>
            <p className="contact-card-detail">Available 24/7</p>
            <button className="btn btn-primary btn-sm">Start Chat</button>
          </div>
          <div className="contact-card">
            <span className="contact-card-icon">📞</span>
            <h3>Call Us</h3>
            <p className="contact-card-detail">+1 (800) 555-VIBE</p>
            <p className="contact-card-note">Mon-Fri, 9AM-6PM EST</p>
          </div>
        </div>

        {/* Contact Form + FAQ */}
        <div className="contact-grid">
          <div className="contact-form-card">
            <h2>Send Us a Message</h2>

            {submitted && (
              <div className="alert alert-success">
                ✅ Your message has been sent! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Issue</option>
                    <option value="refund">Refund Request</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Order Number</label>
                  <input
                    type="text"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Send Message
              </button>
            </form>
          </div>

          <div className="faq-card">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {FAQ_DATA.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${expandedFaq === index ? 'expanded' : ''}`}
                >
                  <button
                    className="faq-question"
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? -1 : index)
                    }
                  >
                    <span>{faq.question}</span>
                    <span className="faq-arrow">
                      {expandedFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {expandedFaq === index && (
                    <p className="faq-answer">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="contact-cta">
          <h2>
            Still Need <span className="text-accent">Help?</span>
          </h2>
          <p>Browse our comprehensive help center for detailed guides and tutorials.</p>
          <button className="btn btn-primary">Browse Help Center</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
