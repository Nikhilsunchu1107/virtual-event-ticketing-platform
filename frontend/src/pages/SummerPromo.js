import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const SummerPromo = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const offers = [
    { name: 'Summer Festival Pass', price: 149, original: 249, badge: 'Best Value' },
    { name: 'VIP Summer Experience', price: 299, original: 499, badge: 'Popular' },
    { name: 'Weekend Bundle', price: 99, original: 179, badge: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-400">
      <SEO title="Summer Event Pass" description="Get up to 50% off on summer events. Limited time offer!" />

      <nav className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-black text-white">EventVibe</Link>
        <Link to="/events" className="rounded-full bg-white/20 px-6 py-2 font-bold text-white backdrop-blur-sm hover:bg-white/30">
          Browse Events
        </Link>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="text-center">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-bold uppercase tracking-widest text-white">
            Limited Time Offer
          </span>
          <h1 className="mb-6 text-6xl font-black text-white md:text-8xl">
            SUMMER<br /><span className="text-orange-900">EVENT PASS</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl font-medium text-white/90">
            Unlock exclusive access to premium virtual events at unbeatable prices. Bundle up and save big!
          </p>

          <div className="mb-12 flex justify-center gap-4">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="flex flex-col items-center rounded-2xl bg-white/20 p-4 backdrop-blur-md min-w-[80px]">
                <span className="text-3xl font-black text-white">{String(value).padStart(2, '0')}</span>
                <span className="text-xs font-bold uppercase text-white/80">{label}</span>
              </div>
            ))}
          </div>

          <Link to="/events" className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-xl font-black text-orange-500 shadow-2xl transition-all hover:scale-105 hover:shadow-xl">
            Get Your Pass <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {offers.map((offer) => (
            <div key={offer.name} className="relative rounded-3xl bg-white p-8 shadow-2xl">
              {offer.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold uppercase text-white">
                  {offer.badge}
                </span>
              )}
              <h3 className="mb-2 text-xl font-bold text-gray-900">{offer.name}</h3>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-black text-orange-500">${offer.price}</span>
                <span className="text-lg text-gray-400 line-through">${offer.original}</span>
              </div>
              <ul className="mb-8 space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Full event access</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Interactive sessions</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-green-500 text-sm">check</span> Bonus content</li>
              </ul>
              <Link to="/events" className="block w-full rounded-xl bg-orange-500 py-3 text-center font-bold text-white hover:bg-orange-600">
                Buy Now
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-white/10 p-12 text-center backdrop-blur-md">
          <h2 className="mb-4 text-3xl font-black text-white">Why Choose Summer Pass?</h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <span className="material-symbols-outlined text-4xl text-white">savings</span>
              <p className="mt-2 font-bold text-white">Save up to 50%</p>
            </div>
            <div>
              <span className="material-symbols-outlined text-4xl text-white">event</span>
              <p className="mt-2 font-bold text-white">50+ Events</p>
            </div>
            <div>
              <span className="material-symbols-outlined text-4xl text-white">devices</span>
              <p className="mt-2 font-bold text-white">Any Device</p>
            </div>
            <div>
              <span className="material-symbols-outlined text-4xl text-white">calendar_month</span>
              <p className="mt-2 font-bold text-white">3-Month Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummerPromo;