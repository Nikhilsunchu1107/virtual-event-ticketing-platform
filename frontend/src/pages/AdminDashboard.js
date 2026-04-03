/**
 * Admin Dashboard Page
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import adminService from '../services/adminService';
import inventoryService from '../services/inventoryService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Orders tab filters
  const [orderStatusFilter, setOrderStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');

  // Inventory tab state
  const [adjustingEventId, setAdjustingEventId] = useState(null);
  const [adjustmentValue, setAdjustmentValue] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccessMsg('');
      const token = localStorage.getItem('token');

      if (activeTab === 'dashboard') {
        const response = await adminService.getDashboardStats(token);
        setStats(response.stats);
      } else if (activeTab === 'users') {
        const response = await adminService.getAllUsers(token);
        setUsers(response.users);
      } else if (activeTab === 'analytics') {
        const response = await adminService.getEventsAnalytics(token);
        setAnalytics(response.analytics);
      } else if (activeTab === 'orders') {
        await fetchOrders();
      } else if (activeTab === 'inventory') {
        const response = await inventoryService.getInventoryOverview(token);
        setInventory(response.inventory);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    const filters = {};
    if (orderStatusFilter) filters.status = orderStatusFilter;
    if (paymentStatusFilter) filters.paymentStatus = paymentStatusFilter;
    const response = await adminService.getAllOrders(filters, token);
    setOrders(response.orders);
  };

  const handleFilterOrders = async () => {
    try {
      setLoading(true);
      setError('');
      await fetchOrders();
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      setError('');
      setSuccessMsg('');
      const token = localStorage.getItem('token');
      const response = await adminService.updateOrderStatus(orderId, newStatus, token);
      setSuccessMsg(response.message);
      // Refresh orders list
      await fetchOrders();
    } catch (err) {
      setError(err.message || 'Failed to update order status');
    }
  };

  const handleAdjustInventory = async (eventId) => {
    try {
      setError('');
      setSuccessMsg('');
      const token = localStorage.getItem('token');
      const response = await inventoryService.adjustInventory(
        eventId,
        adjustmentValue,
        token
      );
      setSuccessMsg(response.message);
      setAdjustingEventId(null);
      setAdjustmentValue(0);
      // Refresh inventory list
      const invResponse = await inventoryService.getInventoryOverview(token);
      setInventory(invResponse.inventory);
    } catch (err) {
      setError(err.message || 'Failed to adjust inventory');
    }
  };

  const getStockBadgeClass = (status) => {
    switch (status) {
      case 'in_stock': return 'stock-badge stock-in';
      case 'low_stock': return 'stock-badge stock-low';
      case 'sold_out': return 'stock-badge stock-out';
      default: return 'stock-badge';
    }
  };

  const getStockLabel = (status) => {
    switch (status) {
      case 'in_stock': return 'In Stock';
      case 'low_stock': return 'Low Stock';
      case 'sold_out': return 'Sold Out';
      default: return status;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h1>⚙️ Admin Dashboard</h1>
          <p>Welcome, {user?.name}! Manage your events and sales.</p>
        </div>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Orders
          </button>
          <button
            className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            📋 Inventory
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 Users
          </button>
          <button
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📈 Analytics
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {successMsg && <div className="alert alert-success">{successMsg}</div>}

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading data...</p>
          </div>
        ) : (
          <>
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && stats && (
              <div className="dashboard-content">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-info">
                      <p className="stat-label">Total Users</p>
                      <p className="stat-value">{stats.totalUsers}</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">🎫</div>
                    <div className="stat-info">
                      <p className="stat-label">Total Events</p>
                      <p className="stat-value">{stats.totalEvents}</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">📦</div>
                    <div className="stat-info">
                      <p className="stat-label">Total Orders</p>
                      <p className="stat-value">{stats.totalOrders}</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                      <p className="stat-label">Total Revenue</p>
                      <p className="stat-value">₹{stats.totalRevenue?.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon">🎟️</div>
                    <div className="stat-info">
                      <p className="stat-label">Tickets Sold</p>
                      <p className="stat-value">{stats.ticketsSold}</p>
                    </div>
                  </div>
                </div>

                <div className="recent-orders">
                  <h2>Recent Orders</h2>
                  <div className="orders-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Order #</th>
                          <th>Customer</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.recentOrders?.map((order) => (
                          <tr key={order._id}>
                            <td>{order.orderNumber}</td>
                            <td>{order.user?.name}</td>
                            <td>₹{order.totalAmount.toFixed(2)}</td>
                            <td>
                              <span className={`status-badge status-${order.orderStatus}`}>
                                {order.orderStatus}
                              </span>
                            </td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="top-events">
                  <h2>Top Events</h2>
                  <div className="events-list">
                    {stats.topEvents?.map((event) => (
                      <div key={event._id} className="event-row">
                        <div className="event-info">
                          <p className="event-name">{event.title}</p>
                          <p className="event-meta">
                            {event.ticketsSold} / {event.ticketsAvailable} sold
                          </p>
                        </div>
                        <p className="event-revenue">
                          ₹{(event.price * event.ticketsSold).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="orders-content">
                <h2>📦 Order Management</h2>
                <div className="filter-bar">
                  <div className="filter-group">
                    <label htmlFor="orderStatusFilter">Order Status:</label>
                    <select
                      id="orderStatusFilter"
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                  <div className="filter-group">
                    <label htmlFor="paymentStatusFilter">Payment:</label>
                    <select
                      id="paymentStatusFilter"
                      value={paymentStatusFilter}
                      onChange={(e) => setPaymentStatusFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                  <button className="btn-small btn-filter" onClick={handleFilterOrders}>
                    🔍 Filter
                  </button>
                </div>

                <div className="orders-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Order #</th>
                        <th>Customer</th>
                        <th>Tickets</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan="8" style={{ textAlign: 'center', padding: '30px' }}>
                            No orders found
                          </td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order._id}>
                            <td><strong>{order.orderNumber}</strong></td>
                            <td>
                              <div>{order.user?.name}</div>
                              <small style={{ color: '#888' }}>{order.user?.email}</small>
                            </td>
                            <td>{order.tickets?.length || 0}</td>
                            <td><strong>₹{order.totalAmount.toFixed(2)}</strong></td>
                            <td>
                              <span className={`status-badge status-${order.paymentStatus}`}>
                                {order.paymentStatus}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge status-${order.orderStatus}`}>
                                {order.orderStatus}
                              </span>
                            </td>
                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                            <td>
                              <div className="action-buttons">
                                {order.orderStatus === 'confirmed' && (
                                  <>
                                    <button
                                      className="btn-small btn-cancel"
                                      onClick={() =>
                                        handleUpdateOrderStatus(order._id, 'cancelled')
                                      }
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="btn-small btn-refund"
                                      onClick={() =>
                                        handleUpdateOrderStatus(order._id, 'refunded')
                                      }
                                    >
                                      Refund
                                    </button>
                                  </>
                                )}
                                {(order.orderStatus === 'cancelled' ||
                                  order.orderStatus === 'refunded') && (
                                  <button
                                    className="btn-small btn-confirm"
                                    onClick={() =>
                                      handleUpdateOrderStatus(order._id, 'confirmed')
                                    }
                                  >
                                    Re-confirm
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <div className="inventory-content">
                <h2>📋 Inventory Management</h2>
                <div className="inventory-summary">
                  <div className="inv-stat">
                    <span className="inv-stat-value">
                      {inventory.filter((e) => e.stockStatus === 'sold_out').length}
                    </span>
                    <span className="inv-stat-label">Sold Out</span>
                  </div>
                  <div className="inv-stat">
                    <span className="inv-stat-value inv-stat-warn">
                      {inventory.filter((e) => e.stockStatus === 'low_stock').length}
                    </span>
                    <span className="inv-stat-label">Low Stock</span>
                  </div>
                  <div className="inv-stat">
                    <span className="inv-stat-value inv-stat-ok">
                      {inventory.filter((e) => e.stockStatus === 'in_stock').length}
                    </span>
                    <span className="inv-stat-label">In Stock</span>
                  </div>
                </div>

                <div className="inventory-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Event</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>Sold</th>
                        <th>Remaining</th>
                        <th>Occupancy</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.length === 0 ? (
                        <tr>
                          <td colSpan="9" style={{ textAlign: 'center', padding: '30px' }}>
                            No events found
                          </td>
                        </tr>
                      ) : (
                        inventory.map((event) => (
                          <tr key={event._id}>
                            <td>
                              <strong>{event.title}</strong>
                              <br />
                              <small style={{ color: '#888' }}>
                                {new Date(event.eventDate).toLocaleDateString()}
                              </small>
                            </td>
                            <td>{event.category}</td>
                            <td>₹{event.price}</td>
                            <td>{event.ticketsAvailable}</td>
                            <td>{event.ticketsSold}</td>
                            <td>
                              <strong>{event.remaining}</strong>
                            </td>
                            <td>
                              <div className="progress-mini">
                                <div
                                  className="progress-fill"
                                  style={{ width: `${Math.min(event.occupancy, 100)}%` }}
                                ></div>
                              </div>
                              {event.occupancy}%
                            </td>
                            <td>
                              <span className={getStockBadgeClass(event.stockStatus)}>
                                {getStockLabel(event.stockStatus)}
                              </span>
                            </td>
                            <td>
                              {adjustingEventId === event._id ? (
                                <div className="adjust-form">
                                  <input
                                    type="number"
                                    value={adjustmentValue}
                                    onChange={(e) =>
                                      setAdjustmentValue(parseInt(e.target.value) || 0)
                                    }
                                    placeholder="+/- amount"
                                    className="adjust-input"
                                  />
                                  <button
                                    className="btn-small btn-confirm"
                                    onClick={() => handleAdjustInventory(event._id)}
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="btn-small btn-cancel"
                                    onClick={() => {
                                      setAdjustingEventId(null);
                                      setAdjustmentValue(0);
                                    }}
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="btn-small"
                                  onClick={() => setAdjustingEventId(event._id)}
                                >
                                  Adjust
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="users-content">
                <h2>Users Management</h2>
                <div className="users-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`role-badge ${user.isAdmin ? 'admin' : 'user'}`}>
                              {user.isAdmin ? 'Admin' : 'User'}
                            </span>
                          </td>
                          <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td>
                            <button className="btn-small">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="analytics-content">
                <h2>Events Analytics</h2>
                <div className="analytics-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Event</th>
                        <th>Price</th>
                        <th>Sold / Available</th>
                        <th>Occupancy</th>
                        <th>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.map((event) => (
                        <tr key={event.id}>
                          <td>{event.title}</td>
                          <td>₹{event.price}</td>
                          <td>
                            {event.ticketsSold} / {event.ticketsAvailable}
                          </td>
                          <td>
                            <div className="progress-mini">
                              <div
                                className="progress-fill"
                                style={{ width: `${event.occupancy}%` }}
                              ></div>
                            </div>
                            {event.occupancy}%
                          </td>
                          <td className="revenue">₹{event.revenue.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
