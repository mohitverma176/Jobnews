import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Global.css';

export default function FloatingWatchlist() {
  const location = useLocation();
  const isNews = location.pathname === '/news';
  const storageKey = isNews ? 'news_watchlist' : 'job_watchlist';
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
        setCount(Array.isArray(saved) ? saved.length : 0);
      } catch {
        setCount(0);
      }
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('watchlistUpdated', updateCount);

    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('watchlistUpdated', updateCount);
    };
  }, [storageKey]);

  return (
    <Link to="/watchlist" state={{ type: isNews ? 'news' : 'jobs' }} className="floating-watchlist-circle" title="View Saved Watchlist">
      <span className="floating-circle-icon">🔖</span>
      {count > 0 && <span className="floating-circle-badge">{count}</span>}
    </Link>
  );
}
