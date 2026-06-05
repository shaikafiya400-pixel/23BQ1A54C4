function NotificationCard({ notification }) {
  const id = notification.id || 'Unknown ID';
  const type = notification.notification_type || notification.Type || 'Unknown';
  const message = notification.message || notification.Message || 'No message provided.';
  const timestamp = notification.timestamp || notification.Timestamp;
  const typeSlug = (type || 'unknown').toString().toLowerCase();
  const formattedTimestamp = timestamp ? new Date(timestamp).toLocaleString() : 'Unknown time';

  return (
    <article className="notification-card">
      <div className="notification-card__header">
        <span className={`notification-card__type notification-card__type--${typeSlug}`}>
          {type}
        </span>
        <span className="notification-card__id">ID: {id}</span>
      </div>
      <p className="notification-card__message">{message}</p>
      <time className="notification-card__timestamp">{formattedTimestamp}</time>
    </article>
  );
}

export default NotificationCard;
