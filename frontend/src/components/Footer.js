/**
 * Footer Component — Dark Theme (Matching Reference Design)
 */

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-surface pb-10 pt-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-20 grid gap-12 md:grid-cols-4">
          <div>
            <Link to="/" className="mb-6 flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <span className="material-symbols-outlined text-xl text-white">confirmation_number</span>
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-white">EventVibe</h2>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-500">
              The ultimate platform for high-end virtual events. Connecting fans and creators in
              ways never imagined.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://example.com"
                className="group flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-primary/20"
                aria-label="Website"
              >
                <span className="material-symbols-outlined text-xl text-slate-400 group-hover:text-primary">
                  language
                </span>
              </a>
              <a
                href="https://example.com"
                className="group flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-primary/20"
                aria-label="Share"
              >
                <span className="material-symbols-outlined text-xl text-slate-400 group-hover:text-primary">
                  share
                </span>
              </a>
              <a
                href="https://example.com"
                className="group flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-primary/20"
                aria-label="Announcements"
              >
                <span className="material-symbols-outlined text-xl text-slate-400 group-hover:text-primary">
                  campaign
                </span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>
                <Link to="/events" className="transition-colors hover:text-primary">
                  Find Events
                </Link>
              </li>
              <li>
                <Link to="/events" className="transition-colors hover:text-primary">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  Ticket Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Support</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Newsletter</h4>
            <p className="mb-4 text-sm text-slate-500">Get the latest event drops in your inbox.</p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-primary focus:ring-2 focus:ring-primary/40"
              />
              <button className="rounded-lg bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-10 text-xs text-slate-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} EventVibe Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://example.com" className="transition-colors hover:text-white">
              English (US)
            </a>
            <a href="https://example.com" className="transition-colors hover:text-white">
              USD ($)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
