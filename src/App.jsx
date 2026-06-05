import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Notifications from './pages/Notifications.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Notifications />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
