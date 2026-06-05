import { useEffect, useState } from 'react';
import { fetchNotifications } from '../services/api.js';
import { Log } from '../utils/logger.js';
import FilterBar from '../components/FilterBar.jsx';
import NotificationCard from '../components/NotificationCard.jsx';
import Pagination from '../components/Pagination.jsx';

const ITEMS_PER_PAGE = 6;

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    Log('pages/Notifications.jsx', 'info', 'NotificationsPage', 'Notifications page render');
  });

  useEffect(() => {
    async function loadNotifications() {
      setLoading(true);
      setError(null);
      Log('pages/Notifications.jsx', 'info', 'NotificationsPage', `API request start page=${page} type=${type}`);

      try {
        const data = await fetchNotifications({
          page,
          limit: ITEMS_PER_PAGE,
          notification_type: type,
        });

        setNotifications(data.notifications || []);
        setTotalPages(data.totalPages || 1);
        Log('pages/Notifications.jsx', 'info', 'NotificationsPage', 'API request success');
      } catch (err) {
        setError('Unable to load notifications. Please try again later.');
        Log('pages/Notifications.jsx', 'error', 'NotificationsPage', `API request failure: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, [page, type]);

  const handleFilterChange = (selectedType) => {
    Log('pages/Notifications.jsx', 'info', 'NotificationsPage', `Filter changed to ${selectedType}`);
    setType(selectedType);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    Log('pages/Notifications.jsx', 'info', 'NotificationsPage', `Pagination changed to page ${newPage}`);
    setPage(newPage);
  };

  return (
    <section className="notifications-page">
      <div className="page-header">
        <div>
          <h2>Campus Alerts</h2>
          <p>Browse recent announcements, results, and placement messages.</p>
        </div>
      </div>

      <FilterBar selectedType={type} onTypeChange={handleFilterChange} />

      {loading && (
        <div className="status-block status-block--loading">
          <div className="spinner" />
          <p>Loading notifications...</p>
        </div>
      )}

      {error && (
        <div className="status-block status-block--error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && notifications.length === 0 && (
        <div className="status-block status-block--empty">
          <p>No notifications available for the selected filter.</p>
        </div>
      )}

      <div className="notification-grid">
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </section>
  );
}

export default Notifications;
