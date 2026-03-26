/**
 * My Tickets Page
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import orderService from '../services/orderService';

const MyTickets = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await orderService.getUserOrders(token);
      setOrders(response.orders);
    } catch (err) {
      setError(err.message || 'Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-24 text-slate-400">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border-dark border-t-primary"></div>
        <p>Loading your tickets...</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="mb-6 text-4xl font-black text-white">My Tickets</h1>

        {error && (
          <div className="mb-6 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-surface p-10 text-center">
            <p className="mb-4 text-slate-300">You haven't purchased any tickets yet</p>
            <button
              onClick={() => navigate('/')}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="rounded-2xl border border-white/10 bg-surface p-6">
                <div className="mb-5 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white">Order #{order.orderNumber}</h3>
                    <p className="text-sm text-slate-400">
                      Purchased on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase text-primary">
                      {order.orderStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 text-lg font-bold text-white">Tickets ({order.tickets.length})</h4>
                  {order.tickets.map((ticket, index) => (
                    <div
                      key={ticket._id}
                      className="mb-3 flex flex-col justify-between gap-3 rounded-xl border border-white/10 bg-black/30 p-4 md:flex-row md:items-center"
                    >
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">
                          Ticket #{index + 1}
                        </p>
                        <p className="font-semibold text-white">{ticket.eventTitle}</p>
                        <p className="text-sm text-slate-400">
                          {new Date(ticket.eventDate).toLocaleDateString()} at {ticket.eventTime}
                        </p>
                        <p className="text-xs text-slate-400">
                          Code: <code className="text-slate-200">{ticket.ticketNumber}</code>
                        </p>
                      </div>

                      <button className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white">
                        Download PDF
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Total Amount</span>
                    <span className="font-bold text-primary">₹{order.totalAmount}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span>Payment Status</span>
                    <span className="font-semibold capitalize text-white">{order.paymentStatus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
