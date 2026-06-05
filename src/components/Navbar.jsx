import { useEffect, useState } from 'react';
import { setAuthToken } from '../services/api.js';

function Navbar() {
  const [token, setToken] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('AUTH_TOKEN');
      if (stored) {
        setToken(stored);
        setAuthToken(stored);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const applyToken = (value) => {
    setToken(value);
    setAuthToken(value || null);
    try {
      if (value) localStorage.setItem('AUTH_TOKEN', value);
      else localStorage.removeItem('AUTH_TOKEN');
    } catch (e) {
      // ignore
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">📣</span>
        <div>
          <h1>Campus Notifications</h1>
          <p>Real-time updates for students and staff</p>
        </div>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        <label style={{ color: '#94a3b8', fontSize: '0.9rem' }} htmlFor="devToken">Token</label>
        <input
          id="devToken"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter dev token"
          style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid rgba(148,163,184,0.12)', background: '#0b1220', color: '#e2e8f0' }}
        />
        <button type="button" onClick={() => applyToken(token)} style={{ padding: '8px 12px', borderRadius: 8 }}>
          Apply
        </button>
        <button type="button" onClick={() => applyToken('')} style={{ padding: '8px 12px', borderRadius: 8 }}>
          Clear
        </button>
      </div>
    </header>
  );
}

export default Navbar;
