import axios from 'axios';
import { Log } from '../utils/logger.js';

const API_BASE = 'http://4.224.186.213/evaluation-service';
let AUTH_TOKEN = null;

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function setAuthToken(token) {
  AUTH_TOKEN = token;
  if (token) {
    client.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.Authorization;
  }
}

function normalizeNotification(raw = {}) {
  return {
    id: raw.id || raw.ID || raw.Id || raw.iD || '',
    notification_type: raw.notification_type || raw.Type || raw.type || 'Unknown',
    message: raw.message || raw.Message || raw.msg || '',
    timestamp: raw.timestamp || raw.Timestamp || raw.time || '',
  };
}

export async function fetchNotifications({ page, limit, notification_type }) {
  const query = {
    page,
    limit,
  };

  if (notification_type && notification_type !== 'All') {
    query.notification_type = notification_type;
  }

  try {
    Log('services/api.js', 'info', 'NotificationAPI', `Requesting notifications page=${page} limit=${limit} type=${notification_type}`);
    const response = await client.get('/notifications', { params: query });
    Log('services/api.js', 'info', 'NotificationAPI', 'Notification request succeeded');

    const payload = response.data || {};
    const rawNotifications = Array.isArray(payload.notifications)
      ? payload.notifications
      : Array.isArray(payload.data)
      ? payload.data
      : [];

    // Try several sources for total pages: response body fields or response headers
    const headerTotalPages =
      parseInt(response.headers?.['x-total-pages']) || parseInt(response.headers?.['x-total_count']) || null;

    return {
      notifications: rawNotifications.map(normalizeNotification),
      totalPages:
        payload.totalPages || payload.total_pages || payload.total || headerTotalPages || 1,
    };
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    Log('services/api.js', 'error', 'NotificationAPI', `Notification request failed: ${message}`);
    throw error;
  }
}
