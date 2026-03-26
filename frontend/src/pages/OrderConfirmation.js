/**
 * Order Confirmation Page
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import orderService from '../services/orderService';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await orderService.getOrderById(orderId, token);
      setOrder(response.order);
    } catch (err) {
      setError(err.message || 'Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 px-6 py-24 text-slate-400">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-border-dark border-t-primary"></div>
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="px-6 py-12">
        <div className="mx-auto max-w-[700px] rounded-2xl border border-white/10 bg-surface p-8 text-center">
          <p className="mb-4 text-slate-300">{error || 'Order not found'}</p>
          <Link to="/" className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white">
              Continue Shopping
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-12">
      <div className="mx-auto max-w-[900px] rounded-2xl border border-white/10 bg-surface p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-2xl text-emerald-300">
            ✓
          </div>
          <h1 className="text-4xl font-black text-white">Order Confirmed!</h1>
          <p className="mt-2 text-slate-300">
            Thank you for your purchase! Your tickets have been confirmed.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-surface p-3">
              <span className="text-sm text-slate-400">Order Number</span>
              <span className="font-semibold text-white">{order.orderNumber}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-surface p-3">
              <span className="text-sm text-slate-400">Confirmation Email</span>
              <span className="font-semibold text-white">{order.attendeeEmail}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-surface p-3">
              <span className="text-sm text-slate-400">Total Amount</span>
              <span className="font-bold text-primary">₹{order.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-surface p-3">
              <span className="text-sm text-slate-400">Payment Status</span>
              <span className="font-semibold uppercase text-white">{order.paymentStatus}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-xl font-bold text-white">Your Tickets ({order.tickets.length})</h3>
          <div className="space-y-3">
            {order.tickets.map((ticket, index) => (
              <div
                key={ticket._id}
                className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-300"
              >
                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-primary">
                  Ticket #{index + 1}
                </p>
                <p className="font-semibold text-white">{ticket.eventTitle}</p>
                <p>
                  {new Date(ticket.eventDate).toLocaleDateString()} at {ticket.eventTime}
                </p>
                <p className="text-xs text-slate-400">Ticket Code: {ticket.ticketNumber}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-5">
          <h3 className="mb-3 text-lg font-bold text-white">What's Next?</h3>
          <ol className="list-inside list-decimal space-y-1 text-sm text-slate-300">
            <li>Check your email for a confirmation message with ticket details</li>
            <li>Download your tickets from your account</li>
            <li>Join the event at the scheduled time</li>
            <li>Enjoy the event!</li>
          </ol>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/my-tickets"
            className="rounded-full bg-primary px-6 py-2.5 text-center text-sm font-bold text-white"
          >
            View My Tickets
          </Link>
          <Link
            to="/"
            className="rounded-full border border-white/20 px-6 py-2.5 text-center text-sm font-bold text-white"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
