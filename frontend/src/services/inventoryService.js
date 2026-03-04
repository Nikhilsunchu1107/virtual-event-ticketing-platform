/**
 * Inventory Service
 * API calls for inventory management (admin)
 */

import axios from 'axios';

const API_URL = '/api/inventory';

const inventoryService = {
  // Get inventory overview
  getInventoryOverview: async (token) => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Adjust inventory for an event
  adjustInventory: async (eventId, adjustment, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/${eventId}/adjust`,
        { adjustment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get low-stock events
  getLowStockEvents: async (threshold, token) => {
    try {
      const params = threshold ? `?threshold=${threshold}` : '';
      const response = await axios.get(`${API_URL}/low-stock${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default inventoryService;
