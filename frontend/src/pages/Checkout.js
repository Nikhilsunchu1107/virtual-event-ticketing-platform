/**
 * Checkout Page
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import cartService from '../services/cartService';
import orderService from '../services/orderService';
import paymentService from '../services/paymentService';
import './Checkout.css';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const [formData, setFormData] = useState({
    attendeeName: user?.name || '',
    attendeeEmail: user?.email || '',
    attendeePhone: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    paymentMethod: 'razorpay',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('billing_')) {
      const field = name.replace('billing_', '');
      setFormData((prev) => ({
        ...prev,
        billingAddress: { ...prev.billingAddress, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setPaymentStatus('Initializing secure checkout...');
      const token = localStorage.getItem('token');

      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      const orderData = await paymentService.createOrder(token);
      setPaymentStatus('Awaiting payment completion...');

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Virtual Event Ticketing',
        description: 'Ticket Purchase',
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            setLoading(true);
            setPaymentStatus('Payment successful! Verifying payment...');

            await paymentService.verifyPayment(
              {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              },
              token
            );

            setPaymentStatus('Payment verified! Creating order...');

            const checkoutPayload = {
              ...formData,
              paymentMethod: 'razorpay',
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            const checkoutRes = await orderService.checkout(checkoutPayload, token);
            await cartService.clearCart(token);
            navigate(`/order-confirmation/${checkoutRes.order._id}`);
          } catch (err) {
            setError(err.message || 'Order completion failed after payment.');
            setLoading(false);
            setPaymentStatus('');
          }
        },
        prefill: {
          name: formData.attendeeName,
          email: formData.attendeeEmail,
          contact: formData.attendeePhone,
        },
        theme: {
          color: '#2b5eb7',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setPaymentStatus('');
            setError('Payment cancelled by user.');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setError(response.error.description || 'Payment failed.');
        setLoading(false);
        setPaymentStatus('');
      });
      rzp.open();
    } catch (err) {
      setError(err.message || err?.message || 'Checkout failed');
      setLoading(false);
      setPaymentStatus('');
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>🛍️ Checkout</h1>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-left">
            {/* Attendee Information */}
            <section className="form-section">
              <h2>Attendee Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="attendeeName"
                    value={formData.attendeeName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="attendeeEmail"
                    value={formData.attendeeEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="attendeePhone"
                  value={formData.attendeePhone}
                  onChange={handleInputChange}
                />
              </div>
            </section>

            {/* Billing Address */}
            <section className="form-section">
              <h2>Billing Address</h2>
              <div className="form-group">
                <label>Street Address *</label>
                <input
                  type="text"
                  name="billing_street"
                  value={formData.billingAddress.street}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="billing_city"
                    value={formData.billingAddress.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State/Province</label>
                  <input
                    type="text"
                    name="billing_state"
                    value={formData.billingAddress.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Postal Code *</label>
                  <input
                    type="text"
                    name="billing_postalCode"
                    value={formData.billingAddress.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Country *</label>
                  <input
                    type="text"
                    name="billing_country"
                    value={formData.billingAddress.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="form-section">
              <h2>Payment Method</h2>
              <p>Razorpay (UPI, Cards, Netbanking, Wallets)</p>
            </section>
          </div>

          <div className="checkout-right">
            <div className="order-summary">
              <h2>Order Summary</h2>
              <p className="summary-note">Items will be shown after cart is loaded</p>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-full"
              >
                {loading ? 'Processing...' : '✓ Complete Purchase'}
              </button>
              {loading && paymentStatus && (
                <p className="payment-status-message" style={{ marginTop: '15px', fontSize: '14px', color: 'var(--primary-color)', textAlign: 'center', fontWeight: '500' }}>
                  {paymentStatus}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
