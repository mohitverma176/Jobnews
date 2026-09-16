import React, { useState, useEffect, useCallback } from 'react';
import FloatingWatchlist from './FloatingWatchlist';
import Pagination from './Pagination';
import './Global.css';

export default function News({options, setoptions}) {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 9;

  const categories = ['All', 'AI', 'Technology', 'OpenAI', 'Security', 'Google', 'Microsoft'];

  const fetchNews = useCallback(async (query = '') => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    try {
      let response;
      const isSearch = query.trim().length > 0;
      const endpoint = isSearch ? '/search/news' : '/news';
      const fallbackEndpoint = isSearch 
        ? 'http://localhost:8000/search/news' 
        : 'http://localhost:8000/news';

      const fetchOptions = isSearch
        ? {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newssearch: query })
          }
        : { method: 'GET' };

      try {
        response = await fetch(endpoint, fetchOptions);
        if (!response.ok) {
          throw new Error(`Proxy status: ${response.status}`);
        }
      } catch (proxyErr) {
        response = await fetch(fallbackEndpoint, fetchOptions);
      }

      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error || data.message) {
        throw new Error(data.error || data.message);
      }

      if (Array.isArray(data)) {
        const normalizedNews = data.map((item, index) => ({
          ...item,
          id: item.id || item.link || `news-${index}-${item.title ? item.title.slice(0, 20) : 'item'}`
        }));
        setNews(normalizedNews);
      } else {
        setNews([]);
      }
      setHasSearched(true);
      setActiveQuery(query);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err.message || 'Failed to load news articles from server.');
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews('');
  }, [fetchNews]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    fetchNews(searchTerm);
  };

  const handleCategoryFilter = (cat) => {
    const q = cat === 'All' ? '' : cat;
    setSearchTerm(q);
    fetchNews(q);
  };

  const handleClear = () => {
    setSearchTerm('');
    fetchNews('');
  };
    const [savedNewIds, setSavedNewIds] = useState(() => {
      try {
        const saved = JSON.parse(localStorage.getItem('news_watchlist') || '[]');
        return Array.isArray(saved) ? saved.map(j => j.id || j.link) : [];
      } catch {
        return [];
      }
    });
  
    const toggleWatchlist = (articleToToggle) => {
      try {
        const articleId = articleToToggle.id || articleToToggle.link || articleToToggle.title;
        const normalizedArticle = { ...articleToToggle, id: articleId };
        const saved = JSON.parse(localStorage.getItem('news_watchlist') || '[]');
        const exists = saved.some(item => (item.id || item.link) === articleId);
        let updated;
        if (exists) {
          updated = saved.filter(item => (item.id || item.link) !== articleId);
        } else {
          updated = [...saved, normalizedArticle];
        }
        localStorage.setItem('news_watchlist', JSON.stringify(updated));
        setSavedNewIds(updated.map(j => j.id || j.link));
        window.dispatchEvent(new Event('watchlistUpdated'));
      } catch (err) {
        console.error('Error updating watchlist:', err);
      }
    };

  // Pagination calculation
  const totalPages = Math.ceil(news.length / newsPerPage);
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  return (
    <div className="news-page">
      {/* Hero Header & Search Section */}
      <section className="news-hero">
        <h1>Latest Technology & Industry News</h1>
        <p>
          Stay informed with real-time news, AI breakthroughs, software development insights, and tech trends.
        </p>

        <form className="news-search-form" onSubmit={handleSearchSubmit}>
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            id="news-search-input"
            className="news-search-input"
            type="text"
            placeholder="Search news by topic, company or keyword (e.g. AI, OpenAI, Security)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={handleClear}
              title="Clear search"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          <button type="submit" id="news-submit-btn" className="news-submit-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search News'}
          </button>
        </form>

        {/* Quick Filter Tags */}
        <div className="news-quick-tags">
          {categories.map((cat) => {
            const isActive = cat === 'All' ? activeQuery === '' : activeQuery.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                className={`news-quick-tag-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results Status Bar */}
      <div className="results-status-bar">
        <div className="results-count">
          {loading ? (
            <span>Loading headlines...</span>
          ) : (
            <span>
              Showing <strong>{news.length > 0 ? `${indexOfFirstNews + 1}-${Math.min(indexOfLastNews, news.length)}` : 0}</strong> of <strong>{news.length}</strong> {news.length === 1 ? 'article' : 'articles'}
              {activeQuery && <span> for "<strong>{activeQuery}</strong>"</span>}
            </span>
          )}
        </div>
        <button
          type="button"
          className="refresh-btn"
          onClick={() => fetchNews(searchTerm)}
          title="Refresh news"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="state-container">
          <div className="spinner"></div>
          <h3>Loading Latest Headlines</h3>
          <p>Fetching top stories from our feed...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="state-container error-state">
          <h3>Unable to Load News</h3>
          <p>{error}</p>
          <button type="button" className="action-btn" onClick={() => fetchNews(searchTerm)}>
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && hasSearched && news.length === 0 && (
        <div className="state-container">
          <h3>No articles found</h3>
          <p>
            We couldn't find any news articles matching "{activeQuery}". Try searching with different keywords.
          </p>
          <button type="button" className="action-btn" onClick={handleClear}>
            View All News
          </button>
        </div>
      )}

      {/* News Grid */}
      {!loading && !error && currentNews.length > 0 && (
        <>
          <div className="news-grid" id="news-grid-container">
            {currentNews.map((item, idx) => (
              <article key={idx} className="news-card">
                <div>
                  {item.date && (
                    <div className="news-card-date">
                      <span>📅</span>
                      <span>{new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  )}
                  <h2 className="news-card-title">{item.title}</h2>
                  {item.description && (
                    <p className="news-card-description">{item.description}</p>
                  )}
                </div>
                <div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-read-more"
                  >
                    Read Full Article ↗
                  </a>
                   <button
                    type="button"
                    className={`watchlist-heart-btn ${savedNewIds.includes(item.id) ? 'saved' : ''}`}
                    onClick={() => toggleWatchlist(item)}
                    title={savedNewIds.includes(item.id) ? 'Remove from Watchlist' : 'Save to Watchlist'}
                    aria-label={savedNewIds.includes(item.id) ? 'Remove from Watchlist' : 'Save to Watchlist'}
                  >
                    <span className="heart-icon">{savedNewIds.includes(item.id) ? '❤️' : '🤍'}</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Floating Circular Watchlist Button */}
      <FloatingWatchlist />
    </div>
  );
}
