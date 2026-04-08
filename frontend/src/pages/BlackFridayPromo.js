import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const BlackFridayPromo = () => {
  const deals = [
    { name: 'Early Bird Special', discount: '40% OFF', desc: 'First 100 customers' },
    { name: 'Bundle Deal', discount: '60% OFF', desc: 'Any 3 events' },
    { name: 'VIP Access', discount: '50% OFF', desc: 'Premium experiences' },
  ];

  return (
    <div className="min-h-screen bg-black">
      <SEO title="Black Friday Sale" description="Exclusive Black Friday discounts on virtual events. Don't miss out!" />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-black">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-600/20 blur-[150px]"></div>
          <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-pink-600/20 blur-[150px]"></div>
        </div>

        <nav className="relative z-10 flex items-center justify-between px-6 py-4">
          <Link to="/" className="text-2xl font-black text-white">EventVibe</Link>
          <Link to="/events" className="rounded-full border border-white/30 bg-white/5 px-6 py-2 font-bold text-white backdrop-blur-sm hover:bg-white/10">
            Browse Events
          </Link>
        </nav>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1 text-sm font-bold uppercase tracking-widest text-white animate-pulse">
            <span>🔥</span> Limited Time Only
          </div>
          
          <h1 className="mb-6 text-7xl font-black text-white md:text-9xl">
            BLACK<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">FRIDAY</span>
          </h1>
          
          <p className="mx-auto mb-12 max-w-2xl text-xl text-gray-400">
            Massive discounts on premium virtual events. Up to 70% OFF on selected packages. Offer ends soon!
          </p>

          <Link to="/events" className="inline-flex items-center gap-3 rounded-none bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-6 text-2xl font-black text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]">
            Shop Now <span className="material-symbols-outlined">shopping_bag</span>
          </Link>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {deals.map((deal) => (
              <div key={deal.name} className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1 text-sm font-black uppercase text-white">
                  {deal.discount}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{deal.name}</h3>
                <p className="text-gray-400">{deal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 text-4xl font-black text-white">Don't Miss These Deals</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-black p-8 text-left">
              <span className="material-symbols-outlined text-4xl text-purple-500">local_shipping</span>
              <h4 className="mt-4 mb-2 text-xl font-bold text-white">Fast Checkout</h4>
              <p className="text-gray-400">Secure payment with Razorpay</p>
            </div>
            <div className="rounded-2xl bg-black p-8 text-left">
              <span className="material-symbols-outlined text-4xl text-pink-500">support_agent</span>
              <h4 className="mt-4 mb-2 text-xl font-bold text-white">24/7 Support</h4>
              <p className="text-gray-400">We're here to help anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackFridayPromo;