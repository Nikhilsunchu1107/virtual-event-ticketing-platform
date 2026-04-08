import React, { useState } from 'react';
import axios from 'axios';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      setStatus('loading');
      const response = await axios.post('/api/marketing/subscribe', { email });
      
      if (response.data.success) {
        setStatus('success');
        setMessage('Thanks for subscribing!');
        setEmail('');
      }
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-full bg-primary px-8 py-3 font-bold text-white transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      {message && (
        <p className={`text-sm ${status === 'success' ? 'text-green-400' : status === 'error' ? 'text-red-400' : 'text-gray-400'}`}>
          {message}
        </p>
      )}
      
      <p className="text-xs text-gray-500">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  );
};

export default NewsletterSignup;