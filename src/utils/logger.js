const LOG_URL = 'http://4.224.186.213/evaluation-service/logs';
const AUTH_TOKEN = 'YOUR_TOKEN';

export async function Log(stack, level, packageName, message) {
  const payload = {
    stack,
    level,
    packageName,
    message,
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(LOG_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Logging failures should not break the app
    // eslint-disable-next-line no-console
    console.warn('Logger failed:', error);
  }
}
